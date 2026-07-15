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

		if (url.pathname === "/api/reservations" && request.method === "GET") {
			const result = await env.DB.prepare(
				"SELECT * FROM reservations ORDER BY shuttle_date, expected_takeout_time"
			).all();

			return Response.json(result.results);
		}

		if (url.pathname === "/api/reservations" && request.method === "POST") {
			const reservation = await request.json();

			const paymentStatus =
				reservation.is_two_rivers_guest === "Yes" &&
				reservation.two_rivers_direct_booking === "Yes"
					? "Included"
					: "Pending";

			const paymentReason =
				paymentStatus === "Included"
					? "Two Rivers Inn direct booking"
					: null;

			await env.DB.prepare(`
				INSERT INTO reservations (
					first_name,
					last_name,
					phone,
					email,
					shuttle_date,
					expected_takeout_time,
					launch_site,
					takeout_site,
					vehicle_year,
					vehicle_make,
					vehicle_model,
					vehicle_color,
					license_plate,
					license_state,
					license_county,
					key_location,
					key_location_other,
					special_instructions,
					is_two_rivers_guest,
					two_rivers_direct_booking,
					is_guide,
					price,
					payment_method,
					payment_status,
					payment_reason,
					cash_location
				)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			`).bind(
				reservation.first_name,
				reservation.last_name,
				reservation.phone,
				reservation.email,
				reservation.shuttle_date,
				reservation.expected_takeout_time,
				reservation.launch_site,
				reservation.takeout_site,
				reservation.vehicle_year,
				reservation.vehicle_make,
				reservation.vehicle_model,
				reservation.vehicle_color,
				reservation.license_plate,
				reservation.license_state,
				reservation.license_county,
				reservation.key_location,
				reservation.key_location_other,
				reservation.special_instructions,
				reservation.is_two_rivers_guest || "No",
				reservation.two_rivers_direct_booking || "No",
				reservation.is_guide || "No",
				Number(reservation.price || 0),
				reservation.payment_method,
				paymentStatus,
				paymentReason,
				reservation.cash_location
			).run();

			return Response.json({
				success: true,
				message: "Reservation created",
			});
		}

				if (url.pathname === "/api/reservations" && request.method === "PATCH") {
			const update = await request.json();
			const now = new Date().toISOString();

			const driver = update.driver ?? null;
			const status = update.status ?? null;
			const paymentStatus = update.payment_status ?? null;

			const startedAt = status === "In Progress" ? now : null;
			const completedAt = status === "Completed" ? now : null;
			const paidAt = paymentStatus === "Paid" ? now : null;

			await env.DB.prepare(`
				UPDATE reservations
				SET
					driver = COALESCE(?, driver),
					status = COALESCE(?, status),

					started_at =
						CASE
							WHEN ? = 'In Progress'
							THEN COALESCE(started_at, ?)
							ELSE started_at
						END,

					completed_at =
						CASE
							WHEN ? = 'Completed'
							THEN COALESCE(completed_at, ?)
							ELSE completed_at
						END,

					payment_status = COALESCE(?, payment_status),

					paid_at =
						CASE
							WHEN ? = 'Paid'
							THEN COALESCE(paid_at, ?)
							ELSE paid_at
						END

				WHERE id = ?
			`).bind(
				driver,
				status,
				status,
				startedAt,
				status,
				completedAt,
				paymentStatus,
				paymentStatus,
				paidAt,
				update.id
			).run();

			return Response.json({
				success: true,
				message: "Reservation updated",
			});
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
	const hostname = url.hostname;

	const isLocal =
		hostname === "127.0.0.1" ||
		hostname === "localhost";

	if (!isLocal) {
		return Response.json(
			{
				success: false,
				message:
					"Developer database tools are only available locally.",
			},
			{ status: 403 }
		);
	}

	const body = await request.json();

	if (body.confirmation !== "CLEAR TEST DATA") {
		return Response.json(
			{
				success: false,
				message: "Confirmation text did not match.",
			},
			{ status: 400 }
		);
	}

	const countResult = await env.DB.prepare(
		"SELECT COUNT(*) AS count FROM reservations"
	).first();

	await env.DB.prepare(
		"DELETE FROM reservations"
	).run();

	return Response.json({
		success: true,
		deleted: countResult?.count ?? 0,
		message: `${countResult?.count ?? 0} test reservations cleared.`,
	});
}
//end devloper tools section
		return new Response("Not Found", { status: 404 });
	},
};