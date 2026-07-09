export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === "/api/status") {
			return Response.json({
				shop: "Thermopolis Fly Shop",
				app: "Shuttle Dispatch System",
				version: "0.1",
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

let startedAt = null;
let completedAt = null;

if (update.status === "In Progress") {
	startedAt = now;
}

if (update.status === "Completed") {
	completedAt = now;
}

			await env.DB.prepare(`
				UPDATE reservations
SET
	driver = ?,
	status = ?,
	started_at = COALESCE(started_at, ?),
	completed_at = ?
WHERE id = ?
`).bind(
	update.driver || "Unassigned",
	update.status || "Scheduled",
	startedAt,
	completedAt,
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

		return new Response("Not Found", { status: 404 });
	},
};