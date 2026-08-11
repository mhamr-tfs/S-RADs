// ======================================================
// Square service
// ======================================================

const SQUARE_VERSION = "2026-07-15";


// ======================================================
// Test Square Sandbox connection
// ======================================================
export async function getSquareLocation(env) {
	const squareResponse = await fetch(
		`https://connect.squareupsandbox.com/v2/locations/${env.SQUARE_LOCATION_ID}`,
		{
			headers: {
				Authorization:
					`Bearer ${env.SQUARE_ACCESS_TOKEN}`,
				"Square-Version": SQUARE_VERSION,
				"Content-Type": "application/json",
			},
		}
	);

	const data = await squareResponse.json();

	if (!squareResponse.ok) {
		return {
			success: false,
			status: squareResponse.status,
			square: data,
		};
	}

	return {
		success: true,
		location: {
			id: data.location?.id,
			name: data.location?.name,
			status: data.location?.status,
			currency: data.location?.currency,
		},
	};
}


// ======================================================
// Create Square payment link
// ======================================================
export async function createSquarePaymentLink(
	env,
	reservationId
) {
	const reservation = await env.DB.prepare(`
		SELECT id, price, payment_status
		FROM reservations
		WHERE id = ?
	`)
		.bind(reservationId)
		.first();

	if (!reservation) {
		return {
			success: false,
			status: 404,
			message: "Reservation not found.",
		};
	}

	const amount = Math.round(
		Number(reservation.price || 0) * 100
	);

	const squareResponse = await fetch(
		"https://connect.squareupsandbox.com/v2/online-checkout/payment-links",
		{
			method: "POST",
			headers: {
				Authorization:
					`Bearer ${env.SQUARE_ACCESS_TOKEN}`,
				"Square-Version": SQUARE_VERSION,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				idempotency_key:
					crypto.randomUUID(),

				quick_pay: {
					name:
						`S-RADs Shuttle Reservation #${reservationId}`,

					price_money: {
						amount,
						currency: "USD",
					},

					location_id:
						env.SQUARE_LOCATION_ID,
				},
			}),
		}
	);

	const data = await squareResponse.json();

	if (!squareResponse.ok) {
		return {
			success: false,
			status: squareResponse.status,
			square: data,
		};
	}

	const squareOrderId =
		data.payment_link?.order_id;

	if (!squareOrderId) {
		return {
			success: false,
			status: 502,
			message:
				"Square did not return an order ID.",
		};
	}

	await env.DB.prepare(`
		UPDATE reservations
		SET square_order_id = ?
		WHERE id = ?
	`)
		.bind(
			squareOrderId,
			reservationId
		)
		.run();

	return {
		success: true,
		reservation_id: reservationId,
		amount,
		payment_link_id:
			data.payment_link?.id,
		order_id: squareOrderId,
		url: data.payment_link?.url,
	};
}


// ======================================================
// Verify Square webhook signature
// ======================================================
export async function verifySquareWebhook(
	env,
	body,
	squareSignature
) {
	const encoder = new TextEncoder();

	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(
			env.SQUARE_WEBHOOK_SIGNATURE_KEY
		),
		{
			name: "HMAC",
			hash: "SHA-256",
		},
		false,
		["sign"]
	);

	const signedData =
		env.SQUARE_WEBHOOK_URL + body;

	const signatureBuffer =
		await crypto.subtle.sign(
			"HMAC",
			key,
			encoder.encode(signedData)
		);

	const generatedSignature = btoa(
		String.fromCharCode(
			...new Uint8Array(
				signatureBuffer
			)
		)
	);

	return generatedSignature === squareSignature;
}


// ======================================================
// Process Square webhook event
// ======================================================
export async function processSquareWebhook(
	env,
	event
) {
	if (
		event.type !== "payment.updated" ||
		event.data?.object?.payment?.status !==
			"COMPLETED"
	) {
		return;
	}

	const payment =
		event.data.object.payment;

	const squareOrderId =
		payment.order_id;

	if (!squareOrderId) {
		return;
	}

	const now = new Date().toISOString();

	const result = await env.DB.prepare(`
		UPDATE reservations
		SET
			payment_status = 'Paid',
			paid_at = COALESCE(paid_at, ?)
		WHERE square_order_id = ?
	`)
		.bind(
			now,
			squareOrderId
		)
		.run();

	console.log(
		"Square payment completed:",
		squareOrderId,
		"reservations updated:",
		result.meta.changes
	);
}
