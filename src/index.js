import {
    handlePhotoUpload,
    handlePhotoList,
    handlePhotoFile
} from "./photos/photo-api.js";

import {
	sendReservationConfirmation,
	sendCompletionEmail,
	sendNewReservationNotification
} from "./email/email-service.js";

import {
	getSquareLocation,
	createSquarePaymentLink,
	verifySquareWebhook,
	processSquareWebhook
} from "./payments/square-service.js";

import {
        handleSirvoyWebhook
} from "./integrations/sirvoy/sirvoy-webhook.js";

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
        getArchivedReservations,
		archiveCompletedReservations,
		editReservationDetails,
        createReservation,
        updateReservation,
		getCriticalChanges,
		acknowledgeCriticalChanges,
        archiveReservation,
        restoreReservation
} from "./reservations/reservation-service.js";

import {
	getRoutes,
	getDrivers
} from "./reference/reference-service.js";

import {
	handleCompletionEmail
} from "./email/email-api.js";

import { 
	APP_VERSION 
} from "./config/app-version.js";

import {
	handleInboundEmail
} from "./email/email-inbound-api.js";

import {
        handleLodgingBenefitValidation
} from "./benefits/lodging-benefit-handler.js";

import {
        handleGetBusinessSettings,
        handleUpdateBusinessSettings
} from "./settings/settings-api.js";

export default {
	
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.pathname === "/favicon.ico") {
	return new Response(null, {
		status: 204,
	});
}
// ======================================================
// Admin business settings
// ======================================================
if (
        request.method === "GET" &&
        url.pathname === "/api/admin/settings"
) {
        return handleGetBusinessSettings(
                env
        );
}

if (
        request.method === "PATCH" &&
        url.pathname === "/api/admin/settings"
) {
        return handleUpdateBusinessSettings(
                request,
                env
        );
}
// ======================================================
// Staff edit reservation details
// ======================================================
if (
        request.method === "PATCH" &&
        url.pathname === "/api/reservations/staff-edit"
) {
        const update =
                await request.json();

        const result =
                await editReservationDetails(
                        env,
                        update
                );

        return Response.json(
                result,
                {
                        status:
                                result.success
                                        ? 200
                                        : 404,
                }
        );
}

		if (url.pathname === "/api/status") {
			return Response.json({
				shop: "Thermopolis Fly Shop",
				app: "Shuttle Dispatch System",
				version: APP_VERSION,
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
	url.pathname === "/api/public/reservations" &&
	request.method === "POST"
) {
	const reservation = await request.json();

	const {
        reservationId,
        paymentStatus,
        lodgingBenefitApplied
} = await createReservation(
        env,
        reservation
);

	try {
		await sendReservationConfirmation(
			env,
			reservation,
			reservationId,
			paymentStatus
		);
	} catch (error) {
		console.error(
			"Reservation confirmation email failed:",
			error
		);
	}
try {
	await sendNewReservationNotification(
		env,
		reservation,
		reservationId,
		paymentStatus
	);
} catch (error) {
	console.error(
		"New reservation staff notification failed:",
		error
	);
}

	return Response.json({
        success: true,
        message: "Reservation created",
        reservation_id: reservationId,
        payment_status: paymentStatus,
        lodging_benefit_applied:
                lodgingBenefitApplied,
});
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
// ======================================================
// Get unacknowledged critical changes
// ======================================================
if (
        request.method === "GET" &&
        url.pathname === "/api/reservations/critical-changes"
) {
        const changes =
                await getCriticalChanges(env);

        return Response.json(changes);
}

// ======================================================
// Acknowledge critical changes
// ======================================================
if (
        request.method === "PATCH" &&
        url.pathname === "/api/reservations/acknowledge-changes"
) {
        const body =
                await request.json();

        const result =
                await acknowledgeCriticalChanges(
                        env,
                        Number(body.id),
                        body.acknowledged_by
                );

        return Response.json(result);
}
// ======================================================
// Archive reservation
// ======================================================
if (
        request.method === "PATCH" &&
        url.pathname === "/api/reservations/archive"
) {
        const body = await request.json();

        const result =
                await archiveReservation(
                        env,
                        Number(body.id)
                );

        return Response.json(result);
}

// ======================================================
// Restore archived reservation
// ======================================================
if (
        request.method === "PATCH" &&
        url.pathname === "/api/reservations/restore"
) {
        const body = await request.json();

        const result =
                await restoreReservation(
                        env,
                        Number(body.id)
                );

        return Response.json(result);
}

		if (
	url.pathname === "/api/routes" &&
	request.method === "GET"
) {
	const routes =
		await getRoutes(env);

	return Response.json(routes);
}
if (
	url.pathname === "/api/drivers" &&
	request.method === "GET"
) {
	const drivers =
		await getDrivers(env);

	return Response.json(drivers);
}
		// for devloper tools section - works on localhost only
		const isLocalhost =
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1";

if (
        isLocalhost &&
        url.pathname === "/dev-tools"
) {
	const assetUrl = new URL(request.url);
	assetUrl.pathname = "/dev-tools.html";

	return env.ASSETS.fetch(
		new Request(assetUrl, request)
	);
}
if (
	isLocalhost &&
	url.pathname === "/api/dev/reservations" &&
	request.method === "DELETE"
) {
	return await clearTestReservations(
		request,
		env
	);
}
// ======================================================
// Get archived reservations
// ======================================================
if (
        request.method === "GET" &&
        url.pathname === "/api/reservations/archived"
) {
        const reservations =
                await getArchivedReservations(env);

        return Response.json(reservations);
}
// ======================================================
// Archive all completed/cancelled reservations
// ======================================================
if (
        request.method === "PATCH" &&
        url.pathname === "/api/reservations/archive-completed"
) {
        const result =
                await archiveCompletedReservations(env);

        return Response.json(result);
}
// ======================================================
// Developer Tools: Load Demo Reservations
// Local development only
// ======================================================
if (
	isLocalhost &&
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
	return await handleCompletionEmail(
		request,
		env
	);
}
// ======================================================
// Sirvoy booking event webhook
// ======================================================
if (
        request.method === "POST" &&
        url.pathname === "/api/integrations/sirvoy/webhook"
) {
        return handleSirvoyWebhook(
                request,
                env
        );
}
// ======================================================
// Lodging benefit validation
// ======================================================
if (
        request.method === "POST" &&
        url.pathname ===
                "/api/benefits/lodging/validate"
) {
        return handleLodgingBenefitValidation(
                request,
                env
        );
}
// ======================================================
// Resend inbound email webhook
// ======================================================
if (
	request.method === "POST" &&
	url.pathname === "/api/email/inbound"
) {
	return await handleInboundEmail(
		request,
		env
	);
}

	}
};
