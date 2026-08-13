// ======================================================
// S-RADs Inbound Email Handler
// Receives Resend email.received webhooks
// ======================================================
import { 
    Resend } from "resend";

// ======================================================
// Approved forwarding aliases
// Destination addresses are stored in Worker env vars
// ======================================================
function getForwardingAddress(
	recipient,
	env
) {
	const forwardingMap = {
		"mike@mail.thermopolisflyshop.com":
			env.EMAIL_FORWARD_MIKE,

		"dan@mail.thermopolisflyshop.com":
			env.EMAIL_FORWARD_DAN,

		"lovina@mail.thermopolisflyshop.com":
			env.EMAIL_FORWARD_LOVINA,
	};

	return forwardingMap[
		recipient.toLowerCase()
	] || null;
}


// ======================================================
// Retrieve full received email from Resend
// ======================================================
async function getReceivedEmail(
	env,
	emailId
) {
	const response = await fetch(
		`https://api.resend.com/emails/receiving/${emailId}`,
		{
			method: "GET",
			headers: {
				Authorization:
					`Bearer ${env.RESEND_INBOUND_API_KEY}`,
			},
		}
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(
			data.message ||
			"Could not retrieve received email."
		);
	}

	return data;
}


// ======================================================
// Forward received email
// ======================================================
async function forwardReceivedEmail(
	env,
	email,
	destination
) {
	const response = await fetch(
		"https://api.resend.com/emails",
		{
			method: "POST",
			headers: {
				Authorization:
					`Bearer ${env.RESEND_INBOUND_API_KEY}`,
				"Content-Type":
					"application/json",
			},
			body: JSON.stringify({
				from:
					"Thermopolis Fly Shop Mail <reservations@mail.thermopolisflyshop.com>",

				to: [destination],

				reply_to:
					email.from,

				subject:
					email.subject || "(No subject)",

				html:
					email.html || undefined,

				text:
					email.text || undefined,
			}),
		}
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(
			data.message ||
			"Could not forward received email."
		);
	}

	return data;
}


// ======================================================
// Resend inbound webhook handler
// ======================================================
export async function handleInboundEmail(
	request,
	env
) {
	try {
		// Resend webhook verification MUST use
		// the untouched raw request body.
		const payload =
			await request.text();

		const resend =
	new Resend(env.RESEND_INBOUND_API_KEY);

let event;

try {
	event =
		resend.webhooks.verify({
			payload,
			headers: {
				id:
					request.headers.get(
						"svix-id"
					),

				timestamp:
					request.headers.get(
						"svix-timestamp"
					),

				signature:
					request.headers.get(
						"svix-signature"
					),
			},

			webhookSecret:
				env.RESEND_WEBHOOK_SECRET,
		});
} catch (error) {
	console.error(
		"Invalid Resend webhook signature:",
		error
	);

	return new Response(
		"Invalid webhook signature",
		{ status: 403 }
	);
}

		// Ignore unrelated Resend events.
		if (event.type !== "email.received") {
			return new Response(
				"Ignored",
				{ status: 200 }
			);
		}

		const emailId =
			event.data?.email_id;

		const recipients =
			event.data?.to || [];

		if (!emailId) {
			return new Response(
				"Missing email ID",
				{ status: 400 }
			);
		}

		if (recipients.length === 0) {
			return new Response(
				"No recipient",
				{ status: 400 }
			);
		}

		const recipient =
			recipients[0];

		const destination =
			getForwardingAddress(
				recipient,
				env
			);

		if (!destination) {
			console.log(
				`Inbound email ignored for unknown alias: ${recipient}`
			);

			return new Response(
				"Unknown alias",
				{ status: 200 }
			);
		}

		const email =
			await getReceivedEmail(
				env,
				emailId
			);

		await forwardReceivedEmail(
			env,
			email,
			destination
		);

		console.log(
			`Forwarded ${recipient} to configured destination`
		);

		return new Response(
			"OK",
			{ status: 200 }
		);
	} catch (error) {
		console.error(
			"Inbound email processing failed:",
			error
		);

		return new Response(
			"Inbound email processing failed",
			{ status: 500 }
		);
	}
}