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
// ======================================================
// Developer Tools: Load Demo Reservations
// Local development only
// ======================================================
if (
	url.pathname === "/api/dev/demo-reservations" &&
	request.method === "POST"
) {
	const isLocal =
		url.hostname === "127.0.0.1" ||
		url.hostname === "localhost";

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

	if (body.confirmation !== "LOAD DEMO DATA") {
		return Response.json(
			{
				success: false,
				message: "Confirmation text did not match.",
			},
			{ status: 400 }
		);
	}

	const existing = await env.DB.prepare(
		"SELECT COUNT(*) AS count FROM reservations"
	).first();

	if ((existing?.count ?? 0) > 0) {
		return Response.json(
			{
				success: false,
				message:
					"Demo data was not loaded because reservations already exist. Clear them first.",
			},
			{ status: 409 }
		);
	}

	const driverResult = await env.DB.prepare(
		"SELECT name FROM drivers WHERE active = 'Yes' ORDER BY name"
	).all();

	const driverNames = driverResult.results.map(
		(driver) => driver.name
	);

	const driverOne = driverNames[0] || "Unassigned";
	const driverTwo = driverNames[1] || "Unassigned";
	const driverThree = driverNames[2] || "Unassigned";

	const now = new Date();

	const startedTwelveMinutesAgo = new Date(
		now.getTime() - 12 * 60 * 1000
	).toISOString();

	const startedFortyMinutesAgo = new Date(
		now.getTime() - 40 * 60 * 1000
	).toISOString();

	const completedTenMinutesAgo = new Date(
		now.getTime() - 10 * 60 * 1000
	).toISOString();

	const paidTwentyMinutesAgo = new Date(
		now.getTime() - 20 * 60 * 1000
	).toISOString();

	const today = new Intl.DateTimeFormat("en-CA", {
		timeZone: "America/Denver",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(now);

	const insertSql = `
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
			license_county,
			license_state,
			key_location,
			key_location_other,
			special_instructions,
			price,
			payment_method,
			payment_status,
			driver,
			status,
			started_at,
			completed_at,
			paid_at
		)
		VALUES (
			?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
		)
	`;

	const demoReservations = [
		{
			firstName: "Alex",
			lastName: "Rivera",
			phone: "3075550101",
			email: "alex.rivera@example.com",
			time: "09:30",
			launch: "Wedding of the Waters",
			takeout: "8th Street Bridge",
			year: "2021",
			make: "Toyota",
			model: "Tacoma",
			color: "Silver",
			plate: "DEMO101",
			county: "Hot Springs",
			state: "WY",
			keyLocation: "Gas cap",
			keyOther: null,
			instructions: "Vehicle parked near the upper ramp.",
			price: 35,
			paymentMethod: "Card",
			paymentStatus: "Paid",
			driver: driverOne,
			status: "In Progress",
			startedAt: startedTwelveMinutesAgo,
			completedAt: null,
			paidAt: paidTwentyMinutesAgo,
		},
		{
			firstName: "Morgan",
			lastName: "Lee",
			phone: "3075550102",
			email: "morgan.lee@example.com",
			time: "10:15",
			launch: "Wedding of the Waters",
			takeout: "Black Mountain",
			year: "2019",
			make: "Ford",
			model: "F-150",
			color: "Blue",
			plate: "DEMO102",
			county: "Fremont",
			state: "WY",
			keyLocation: "Lockbox",
			keyOther: null,
			instructions: "Lockbox code provided at the shop.",
			price: 45,
			paymentMethod: "Cash",
			paymentStatus: "Pending",
			driver: driverTwo,
			status: "Scheduled",
			startedAt: null,
			completedAt: null,
			paidAt: null,
		},
		{
			firstName: "Jordan",
			lastName: "Bennett",
			phone: "3075550103",
			email: "jordan.bennett@example.com",
			time: "11:00",
			launch: "Kirby Ditch",
			takeout: "Wakely Road",
			year: "2022",
			make: "Chevrolet",
			model: "Silverado",
			color: "White",
			plate: "DEMO103",
			county: "Washakie",
			state: "WY",
			keyLocation: "Other",
			keyOther: "Behind the fuel door",
			instructions: "Call customer if vehicle cannot be located.",
			price: 50,
			paymentMethod: "Card",
			paymentStatus: "Paid",
			driver: driverThree,
			status: "Scheduled",
			startedAt: null,
			completedAt: null,
			paidAt: paidTwentyMinutesAgo,
		},
		{
			firstName: "Taylor",
			lastName: "Morgan",
			phone: "3075550104",
			email: "taylor.morgan@example.com",
			time: "12:30",
			launch: "Wedding of the Waters",
			takeout: "8th Street Bridge",
			year: "2017",
			make: "Subaru",
			model: "Outback",
			color: "Green",
			plate: "DEMO104",
			county: "Park",
			state: "WY",
			keyLocation: "Driver floor mat",
			keyOther: null,
			instructions: null,
			price: 35,
			paymentMethod: "Included",
			paymentStatus: "Included",
			driver: driverOne,
			status: "Completed",
			startedAt: startedFortyMinutesAgo,
			completedAt: completedTenMinutesAgo,
			paidAt: null,
		},
		{
			firstName: "Casey",
			lastName: "Brooks",
			phone: "3075550105",
			email: "casey.brooks@example.com",
			time: "14:00",
			launch: "Black Mountain",
			takeout: "8th Street Bridge",
			year: "2020",
			make: "Jeep",
			model: "Gladiator",
			color: "Red",
			plate: "DEMO105",
			county: "Natrona",
			state: "WY",
			keyLocation: "Gas cap",
			keyOther: null,
			instructions: "Guide shuttle.",
			price: 0,
			paymentMethod: "Guide",
			paymentStatus: "Waived",
			driver: "Unassigned",
			status: "Scheduled",
			startedAt: null,
			completedAt: null,
			paidAt: null,
		},
		{
			firstName: "Riley",
			lastName: "Davis",
			phone: "3075550106",
			email: "riley.davis@example.com",
			time: "15:30",
			launch: "Wedding of the Waters",
			takeout: "8th Street Bridge",
			year: "2018",
			make: "GMC",
			model: "Sierra",
			color: "Black",
			plate: "DEMO106",
			county: "Hot Springs",
			state: "WY",
			keyLocation: "Other",
			keyOther: "Inside magnetic box beneath rear bumper",
			instructions: "Customer cancelled during testing.",
			price: 35,
			paymentMethod: "Card",
			paymentStatus: "Refunded",
			driver: "Unassigned",
			status: "Cancelled",
			startedAt: null,
			completedAt: null,
			paidAt: null,
		},
	];

	const statements = demoReservations.map((reservation) =>
		env.DB.prepare(insertSql).bind(
			reservation.firstName,
			reservation.lastName,
			reservation.phone,
			reservation.email,
			today,
			reservation.time,
			reservation.launch,
			reservation.takeout,
			reservation.year,
			reservation.make,
			reservation.model,
			reservation.color,
			reservation.plate,
			reservation.county,
			reservation.state,
			reservation.keyLocation,
			reservation.keyOther,
			reservation.instructions,
			reservation.price,
			reservation.paymentMethod,
			reservation.paymentStatus,
			reservation.driver,
			reservation.status,
			reservation.startedAt,
			reservation.completedAt,
			reservation.paidAt
		)
	);

	await env.DB.batch(statements);

	return Response.json({
		success: true,
		inserted: demoReservations.length,
		message: `${demoReservations.length} demo reservations loaded.`,
	});
}
//end devloper tools section
		return new Response("Not Found", { status: 404 });
	},
};