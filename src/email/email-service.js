// ======================================================
// S-RADs Email Service
// Handles reservation and completion emails
// ======================================================


// ======================================================
// Reservation confirmation email
// ======================================================
export async function sendReservationConfirmation(
	env,
	reservation,
	reservationId,
	paymentStatus
) {
	const resendResponse = await fetch(
		"https://api.resend.com/emails",
		{
			method: "POST",
			headers: {
				Authorization:
					`Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from:
					"Thermopolis Fly Shop Shuttles <reservations@mail.thermopolisflyshop.com>",

				reply_to:
					"thermopolisflyshop@gmail.com",

				to: [reservation.email],

				subject:
					`Shuttle Reservation Confirmation #${reservationId}`,

				html: `
					<h2>
						Thermopolis Fly Shop Shuttle Reservation
					</h2>

					<p>
						Thank you, ${reservation.first_name}.
						Your shuttle reservation has been received.
					</p>

					<p>
						<strong>Reservation:</strong>
						#${reservationId}
						<br>

						<strong>Date:</strong>
						${reservation.shuttle_date}
						<br>

						<strong>Expected Finish Time:</strong>
						${reservation.expected_takeout_time}
						<br>

						<strong>Route:</strong>
						${reservation.launch_site}
						→
						${reservation.takeout_site}
						<br>

						<strong>Price:</strong>
						$${Number(
							reservation.price || 0
						).toFixed(2)}
						<br>

						<strong>Payment Status:</strong>
						${paymentStatus}
					</p>

					<h3>Vehicle</h3>

					<p>
						${reservation.vehicle_year || ""}
						${reservation.vehicle_make || ""}
						${reservation.vehicle_model || ""}

						${reservation.vehicle_color
							? `— ${reservation.vehicle_color}`
							: ""}

						<br>

						<strong>License Plate:</strong>
						${reservation.license_plate ||
						"Not provided"}

						${reservation.license_state
							? ` (${reservation.license_state})`
							: ""}
					</p>

					<h3>Keys</h3>

					<p>
						${reservation.key_location ||
						"No key location provided"}

						${reservation.key_location_other
							? ` — ${reservation.key_location_other}`
							: ""}
					</p>

					<p>
						If anything changes, reply to this email
						or call Thermopolis Fly Shop at
						<strong>(307) 864-3499</strong>.
					</p>

					<p>
						Thank you,
						<br>
						Thermopolis Fly Shop
					</p>
				`,
			}),
		}
	);

	const data = await resendResponse.json();

	if (!resendResponse.ok) {
		throw new Error(
			data.message ||
			"Reservation confirmation email failed."
		);
	}

	return data;
}


// ======================================================
// Convert ArrayBuffer to Base64
// Used for Resend photo attachments
// ======================================================
function arrayBufferToBase64(buffer) {
	const bytes = new Uint8Array(buffer);
	let binary = "";

	const chunkSize = 0x8000;

	for (
		let i = 0;
		i < bytes.length;
		i += chunkSize
	) {
		const chunk = bytes.subarray(
			i,
			Math.min(
				i + chunkSize,
				bytes.length
			)
		);

		binary += String.fromCharCode(
			...chunk
		);
	}

	return btoa(binary);
}


// ======================================================
// Completion email with selected proof photos
// ======================================================
export async function sendCompletionEmail(
	env,
	reservation,
	photos
) {
	const attachments = [];

	for (const photo of photos) {
		const object =
			await env.binding_PHOTOS_BUCKET.get(
				photo.storage_key
			);

		if (!object) {
			throw new Error(
				`Photo file missing: ${photo.id}`
			);
		}

		const buffer =
			await object.arrayBuffer();

		attachments.push({
			content:
				arrayBufferToBase64(buffer),

			filename:
				photo.file_name ||
				`reservation-photo-${photo.id}.jpg`,
		});
	}

	const resendResponse = await fetch(
		"https://api.resend.com/emails",
		{
			method: "POST",
			headers: {
				Authorization:
					`Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from:
					"Thermopolis Fly Shop Shuttles <reservations@mail.thermopolisflyshop.com>",

				reply_to:
					"thermopolisflyshop@gmail.com",

				to: [reservation.email],

				subject:
					`Your vehicle has been moved — Reservation #${reservation.id}`,

				html: `
					<h2>Your Shuttle Is Complete</h2>

					<p>
						Hi ${reservation.first_name},
					</p>

					<p>
						Your vehicle has been moved for shuttle
						reservation #${reservation.id}.
					</p>

					<p>
						<strong>Route:</strong>
						${reservation.launch_site}
						→
						${reservation.takeout_site}
						<br>

						<strong>Vehicle:</strong>
						${reservation.vehicle_year || ""}
						${reservation.vehicle_make || ""}
						${reservation.vehicle_model || ""}

						${reservation.vehicle_color
							? `— ${reservation.vehicle_color}`
							: ""}
					</p>

					<p>
						We've attached the selected completion
						${photos.length === 1
							? "photo"
							: "photos"}
						for your records.
					</p>

					<p>
						If you have any questions, reply to this
						email or call Thermopolis Fly Shop at
						<strong>(307) 864-3499</strong>.
					</p>

					<p>
						Thank you,
						<br>
						Thermopolis Fly Shop
					</p>
				`,

				attachments,
			}),
		}
	);

	const data =
		await resendResponse.json();

	if (!resendResponse.ok) {
		throw new Error(
			data.message ||
			"Completion email failed."
		);
	}

	return data;
}
// ======================================================
// New reservation staff notification
// Temporary operational notification until mobile
// push notifications are available
// ======================================================
export async function sendNewReservationNotification(
	env,
	reservation,
	reservationId,
	paymentStatus
) {
	const recipients = (
		env.SHUTTLE_NOTIFICATION_EMAILS || ""
	)
		.split(",")
		.map((email) => email.trim())
		.filter(Boolean);

	if (recipients.length === 0) {
		console.warn(
			"No shuttle notification email recipients configured."
		);

		return null;
	}

	const resendResponse = await fetch(
		"https://api.resend.com/emails",
		{
			method: "POST",
			headers: {
				Authorization:
					`Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from:
					"Thermopolis Fly Shop Shuttles <reservations@mail.thermopolisflyshop.com>",

				reply_to:
					"thermopolisflyshop@gmail.com",

				to: recipients,

				subject:
					`New Shuttle Reservation #${reservationId}`,

				html: `
					<h2>New Shuttle Reservation</h2>

					<p>
						A new shuttle reservation has been received.
					</p>

					<p>
						<strong>Reservation:</strong>
						#${reservationId}
						<br>

						<strong>Customer:</strong>
						${reservation.first_name}
						${reservation.last_name}
						<br>

						<strong>Phone:</strong>
						${reservation.phone || "Not provided"}
						<br>

						<strong>Date:</strong>
						${reservation.shuttle_date}
						<br>

						<strong>Expected Finish Time:</strong>
						${reservation.expected_takeout_time}
						<br>

						<strong>Route:</strong>
						${reservation.launch_site}
						→
						${reservation.takeout_site}
						<br>

						<strong>Price:</strong>
						$${Number(
							reservation.price || 0
						).toFixed(2)}
						<br>

						<strong>Payment Status:</strong>
						${paymentStatus}
					</p>

					<h3>Vehicle</h3>

					<p>
						${reservation.vehicle_year || ""}
						${reservation.vehicle_make || ""}
						${reservation.vehicle_model || ""}

						${reservation.vehicle_color
							? `— ${reservation.vehicle_color}`
							: ""}

						<br>

						<strong>License Plate:</strong>
						${reservation.license_plate ||
						"Not provided"}

						${reservation.license_state
							? ` (${reservation.license_state})`
							: ""}
					</p>

					<h3>Keys</h3>

					<p>
						${reservation.key_location ||
						"No key location provided"}

						${reservation.key_location_other
							? ` — ${reservation.key_location_other}`
							: ""}
					</p>

					${reservation.special_instructions
						? `
							<h3>Special Instructions</h3>
							<p>
								${reservation.special_instructions}
							</p>
						`
						: ""}
				`,
			}),
		}
	);

	const data = await resendResponse.json();

	if (!resendResponse.ok) {
		throw new Error(
			data.message ||
			"New reservation staff notification failed."
		);
	}

	return data;
}