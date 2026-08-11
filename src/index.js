import {
    handlePhotoUpload,
    handlePhotoList,
    handlePhotoFile
} from "./photos/photo-api.js";

import {
	sendReservationConfirmation,
	sendCompletionEmail
} from "./email/email-service.js";

import {
	getSquareLocation,
	createSquarePaymentLink,
	verifySquareWebhook,
	processSquareWebhook
} from "./payments/square-service.js";

import {
	clearTestReservations,
	loadDemoReservations
} from "./dev-tools/dev-tools-service.js";

import {
	getPaymentSummary,
	getOutstandingPayments
} from "./reports/report-service.js";

import {
	getReservations,
	createReservation,
	updateReservation
} from "./reservations/reservation-service.js";

export default {
	
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === "/api/status") {
			return Response.json({
				shop: "Thermopolis Fly Shop",
				app: "Shuttle Dispatch System",
				version: "0.5.0-alpha",
				status: "Online",
				database: env.DB ? "Connected" : "Not connected",
			});
		}
		if (
	url.pathname === "/api/reservations" &&
	request.method === "GET"
) {
	const reservations =
		await getReservations(env);

	return Response.json(reservations);
}
		if (
	url.pathname === "/api/reservations" &&
	request.method === "PATCH"
) {
	const update = await request.json();

	const result =
		await updateReservation(
			env,
			update
		);

	return Response.json(result);
}

		if (url.pathname === "/api/routes" && request.method === "GET") {
			const result = await env.DB.prepare(
				"SELECT * FROM routes WHERE active = 'Yes' ORDER BY id"
			).all();

			return Response.json(result.results);
		}

		if (url.pathname === "/api/drivers" && request.method === "GET") {
			const result = await env.DB.prepare(
				"SELECT * FROM drivers WHERE active = 'Yes' ORDER BY name"
			).all();

			return Response.json(result.results);
		}
		// for devloper tools section - works on localhost only
		if (url.pathname === "/dev-tools") {
	const assetUrl = new URL(request.url);
	assetUrl.pathname = "/dev-tools.html";

	return env.ASSETS.fetch(
		new Request(assetUrl, request)
	);
}
if (
	url.pathname === "/api/dev/reservations" &&
	request.method === "DELETE"
) {
	return await clearTestReservations(
		request,
		env
	);
}
// ======================================================
// Developer Tools: Load Demo Reservations
// Local development only
// ======================================================
if (
	url.pathname === "/api/dev/demo-reservations" &&
	request.method === "POST"
) {
	return await loadDemoReservations(
		request,
		env
	);
}
//======================================================
// API Reports: Payment Summary
//======================================================
if (
	request.method === "GET" &&
	url.pathname === "/api/reports/payments"
) {
	const result =
		await getPaymentSummary(env);

	return Response.json(result);
}
// ======================================================
// API Reports: Outstanding Payments
// ======================================================
if (
	request.method === "GET" &&
	url.pathname === "/api/reports/payments/outstanding"
) {
	const result =
		await getOutstandingPayments(env);

	return Response.json(result);
}
//Photo upload endpoint
if (
    request.method === "POST" &&
    url.pathname === "/api/photos/upload"
) {
    return await handlePhotoUpload(request, env);
}
if (
    request.method === "GET" &&
    url.pathname.startsWith("/api/photos/file/")
) {
    return await handlePhotoFile(request, env);
}
if (
    request.method === "GET" &&
    url.pathname.startsWith("/api/photos/")
) {
    return await handlePhotoList(request, env);
}
// ======================================================
// Square Sandbox connectivity test
// Temporary development endpoint
// ======================================================
if (
	request.method === "GET" &&
	url.pathname === "/api/square/test"
) {
	const result =
		await getSquareLocation(env);

	if (!result.success) {
		return Response.json(
			result,
			{ status: result.status }
		);
	}

	return Response.json(result);
}
// ======================================================
// Square Sandbox payment link
// ======================================================
if (
	request.method === "POST" &&
	url.pathname === "/api/square/payment-link"
) {
	const body = await request.json();

	const reservationId =
		Number(body.reservation_id);

	const result =
		await createSquarePaymentLink(
			env,
			reservationId
		);

	if (!result.success) {
		return Response.json(
			result,
			{
				status:
					result.status || 500,
			}
		);
	}

	return Response.json(result);
}
//* Temporary tunnel for local development to test Square webhooks.
//* Replace the temporary tunnel URL before production deployment.
if (
	request.method === "POST" &&
	url.pathname === "/api/square/webhook"
) {
	const body = await request.text();

	const squareSignature =
		request.headers.get(
			"x-square-hmacsha256-signature"
		);

	if (!squareSignature) {
		return new Response(
			"Missing Square signature",
			{ status: 403 }
		);
	}

	const signatureValid =
		await verifySquareWebhook(
			env,
			body,
			squareSignature
		);

	if (!signatureValid) {
		console.log(
			"Invalid Square webhook signature"
		);

		return new Response(
			"Invalid signature",
			{ status: 403 }
		);
	}

	const event = JSON.parse(body);

	await processSquareWebhook(
		env,
		event
	);

	return new Response("OK", {
		status: 200,
	});
}
// ======================================================
// Send shuttle completion email
// ======================================================
if (
	request.method === "POST" &&
	url.pathname === "/api/email/completion"
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
// ======================================================
// Resend email connectivity test
// Temporary development endpoint
// ======================================================
if (
	request.method === "POST" &&
	url.pathname === "/api/email/test"
) {
	const resendResponse = await fetch(
		"https://api.resend.com/emails",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
	from: "Thermopolis Fly Shop Shuttles <reservations@mail.thermopolisflyshop.com>",
	reply_to: "thermopolisflyshop@gmail.com",
	to: ["m_hamrick@live.com"],
	subject: "S-RADs email test",
	html: `
		<h2>S-RADs Email Test</h2>
		<p>If you're reading this, the Worker can send email through Resend.</p>
	`,
}),
		}
	);

	const data = await resendResponse.json();

	if (!resendResponse.ok) {
		return Response.json(
			{
				success: false,
				status: resendResponse.status,
				resend: data,
			},
			{ status: resendResponse.status }
		);
	}

	return Response.json({
		success: true,
		email_id: data.id,
	});
}
		return new Response("Not Found", { status: 404 });
	},
};