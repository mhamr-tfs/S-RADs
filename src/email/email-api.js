import {
	sendCompletionEmail
} from "./email-service.js";


// ======================================================
// Completion email API handler
// ======================================================
export async function handleCompletionEmail(
	request,
	env
) {
	const body = await request.json();

	const reservationId =
		Number(body.reservation_id);

	const photoIds =
		Array.isArray(body.photo_ids)
			? body.photo_ids.map(Number)
			: [];

	if (!reservationId) {
		return Response.json(
			{
				success: false,
				message: "Missing reservation ID.",
			},
			{ status: 400 }
		);
	}

	if (photoIds.length === 0) {
		return Response.json(
			{
				success: false,
				message:
					"Select at least one completion photo.",
			},
			{ status: 400 }
		);
	}

	const reservation =
		await env.DB.prepare(`
			SELECT
				id,
				first_name,
				last_name,
				email,
				launch_site,
				takeout_site,
				vehicle_year,
				vehicle_make,
				vehicle_model,
				vehicle_color,
				status
			FROM reservations
			WHERE id = ?
		`)
		.bind(reservationId)
		.first();

	if (!reservation) {
		return Response.json(
			{
				success: false,
				message: "Reservation not found.",
			},
			{ status: 404 }
		);
	}

	if (reservation.status !== "Completed") {
		return Response.json(
			{
				success: false,
				message:
					"Reservation must be completed before sending the completion email.",
			},
			{ status: 409 }
		);
	}

	if (!reservation.email) {
		return Response.json(
			{
				success: false,
				message:
					"Reservation has no customer email address.",
			},
			{ status: 400 }
		);
	}

	const placeholders =
		photoIds.map(() => "?").join(", ");

	const photosResult =
		await env.DB.prepare(`
			SELECT
				id,
				reservation_id,
				file_name,
				storage_key,
				content_type
			FROM photos
			WHERE reservation_id = ?
				AND id IN (${placeholders})
		`)
		.bind(
			reservationId,
			...photoIds
		)
		.all();

	const photos = photosResult.results;

	if (photos.length !== photoIds.length) {
		return Response.json(
			{
				success: false,
				message:
					"One or more selected photos do not belong to this reservation.",
			},
			{ status: 400 }
		);
	}

	try {
		const email =
			await sendCompletionEmail(
				env,
				reservation,
				photos
			);

		return Response.json({
			success: true,
			message:
				"Completion email sent successfully.",
			email_id: email.id,
			reservation_id: reservationId,
			photo_ids: photoIds,
		});
	} catch (error) {
		console.error(
			"Completion email failed:",
			error
		);

		return Response.json(
			{
				success: false,
				message:
					"Completion email could not be sent.",
			},
			{ status: 502 }
		);
	}
}