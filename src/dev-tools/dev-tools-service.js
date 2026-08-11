// ======================================================
// Developer Tools Service
// Local development only
// ======================================================

function isLocalRequest(request) {
	const url = new URL(request.url);

	return (
		url.hostname === "127.0.0.1" ||
		url.hostname === "localhost"
	);
}


// ======================================================
// Clear test reservations
// ======================================================
export async function clearTestReservations(
	request,
	env
) {
	if (!isLocalRequest(request)) {
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
				message:
					"Confirmation text did not match.",
			},
			{ status: 400 }
		);
	}

	const countResult =
		await env.DB.prepare(
			"SELECT COUNT(*) AS count FROM reservations"
		).first();

	await env.DB.prepare(
		"DELETE FROM reservations"
	).run();

	return Response.json({
		success: true,
		deleted:
			countResult?.count ?? 0,
		message:
			`${countResult?.count ?? 0} test reservations cleared.`,
	});
}


// ======================================================
// Load demo reservations
// ======================================================
export async function loadDemoReservations(
	request,
	env
) {
	if (!isLocalRequest(request)) {
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
				message:
					"Confirmation text did not match.",
			},
			{ status: 400 }
		);
	}

	const existing =
		await env.DB.prepare(
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

	const driverResult =
		await env.DB.prepare(
			"SELECT name FROM drivers WHERE active = 'Yes' ORDER BY name"
		).all();

	const driverNames =
		driverResult.results.map(
			(driver) => driver.name
		);

	const driverOne =
		driverNames[0] || "Unassigned";

	const driverTwo =
		driverNames[1] || "Unassigned";

	const driverThree =
		driverNames[2] || "Unassigned";

	const now = new Date();

	const startedTwelveMinutesAgo =
		new Date(
			now.getTime() -
			12 * 60 * 1000
		).toISOString();

	const startedFortyMinutesAgo =
		new Date(
			now.getTime() -
			40 * 60 * 1000
		).toISOString();

	const completedTenMinutesAgo =
		new Date(
			now.getTime() -
			10 * 60 * 1000
		).toISOString();

	const paidTwentyMinutesAgo =
		new Date(
			now.getTime() -
			20 * 60 * 1000
		).toISOString();

	const today =
		new Intl.DateTimeFormat(
			"en-CA",
			{
				timeZone:
					"America/Denver",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			}
		).format(now);

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
			launch:
				"Wedding of the Waters",
			takeout:
				"8th Street Bridge",
			year: "2021",
			make: "Toyota",
			model: "Tacoma",
			color: "Silver",
			plate: "DEMO101",
			county: "Hot Springs",
			state: "WY",
			keyLocation: "Gas cap",
			keyOther: null,
			instructions:
				"Vehicle parked near the upper ramp.",
			price: 35,
			paymentMethod: "Card",
			paymentStatus: "Paid",
			driver: driverOne,
			status: "In Progress",
			startedAt:
				startedTwelveMinutesAgo,
			completedAt: null,
			paidAt:
				paidTwentyMinutesAgo,
		},
		{
			firstName: "Morgan",
			lastName: "Lee",
			phone: "3075550102",
			email:
				"morgan.lee@example.com",
			time: "10:15",
			launch:
				"Wedding of the Waters",
			takeout:
				"Black Mountain",
			year: "2019",
			make: "Ford",
			model: "F-150",
			color: "Blue",
			plate: "DEMO102",
			county: "Fremont",
			state: "WY",
			keyLocation: "Lockbox",
			keyOther: null,
			instructions:
				"Lockbox code provided at the shop.",
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
			email:
				"jordan.bennett@example.com",
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
			keyOther:
				"Behind the fuel door",
			instructions:
				"Call customer if vehicle cannot be located.",
			price: 50,
			paymentMethod: "Card",
			paymentStatus: "Paid",
			driver: driverThree,
			status: "Scheduled",
			startedAt: null,
			completedAt: null,
			paidAt:
				paidTwentyMinutesAgo,
		},
		{
			firstName: "Taylor",
			lastName: "Morgan",
			phone: "3075550104",
			email:
				"taylor.morgan@example.com",
			time: "12:30",
			launch:
				"Wedding of the Waters",
			takeout:
				"8th Street Bridge",
			year: "2017",
			make: "Subaru",
			model: "Outback",
			color: "Green",
			plate: "DEMO104",
			county: "Park",
			state: "WY",
			keyLocation:
				"Driver floor mat",
			keyOther: null,
			instructions: null,
			price: 35,
			paymentMethod: "Included",
			paymentStatus: "Included",
			driver: driverOne,
			status: "Completed",
			startedAt:
				startedFortyMinutesAgo,
			completedAt:
				completedTenMinutesAgo,
			paidAt: null,
		},
		{
			firstName: "Casey",
			lastName: "Brooks",
			phone: "3075550105",
			email:
				"casey.brooks@example.com",
			time: "14:00",
			launch:
				"Black Mountain",
			takeout:
				"8th Street Bridge",
			year: "2020",
			make: "Jeep",
			model: "Gladiator",
			color: "Red",
			plate: "DEMO105",
			county: "Natrona",
			state: "WY",
			keyLocation: "Gas cap",
			keyOther: null,
			instructions:
				"Guide shuttle.",
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
			email:
				"riley.davis@example.com",
			time: "15:30",
			launch:
				"Wedding of the Waters",
			takeout:
				"8th Street Bridge",
			year: "2018",
			make: "GMC",
			model: "Sierra",
			color: "Black",
			plate: "DEMO106",
			county: "Hot Springs",
			state: "WY",
			keyLocation: "Other",
			keyOther:
				"Inside magnetic box beneath rear bumper",
			instructions:
				"Customer cancelled during testing.",
			price: 35,
			paymentMethod: "Card",
			paymentStatus:
				"Refunded",
			driver: "Unassigned",
			status: "Cancelled",
			startedAt: null,
			completedAt: null,
			paidAt: null,
		},
	];

	const statements =
		demoReservations.map(
			(reservation) =>
				env.DB.prepare(insertSql)
					.bind(
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
		inserted:
			demoReservations.length,
		message:
			`${demoReservations.length} demo reservations loaded.`,
	});
}