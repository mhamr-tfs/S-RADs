/* S-RADs Payment Renderer
 *
 * This module provides functions to render payment-related data in the frontend of the S-RADS application.
 * It is designed to work with the payment API to display payment summaries and outstanding payments.
 */
export function renderPaymentSummary(summary) {
	document.getElementById("reservation-count").textContent =
		summary.reservation_count;

	document.getElementById("collected-revenue").textContent =
		`$${summary.collected_revenue.toFixed(2)}`;

	document.getElementById("outstanding-revenue").textContent =
		`$${summary.outstanding_revenue.toFixed(2)}`;

	document.getElementById("included-value").textContent =
		`$${summary.included_value.toFixed(2)}`;

	document.getElementById("waived-value").textContent =
		`$${summary.waived_value.toFixed(2)}`;

	document.getElementById("refunded-value").textContent =
		`$${summary.refunded_value.toFixed(2)}`;

	document.getElementById("paid-count").textContent =
		summary.paid_count;

	document.getElementById("pending-count").textContent =
		summary.pending_count;
}export function renderOutstandingPayments(reservations) {
	const tableBody = document.getElementById(
		"outstanding-payments-body"
	);

	tableBody.innerHTML = "";

	if (reservations.length === 0) {
		const row = document.createElement("tr");

		row.innerHTML = `
			<td colspan="5">
				No outstanding payments.
			</td>
		`;

		tableBody.appendChild(row);
		return;
	}

	for (const reservation of reservations) {
		const row = document.createElement("tr");

		row.innerHTML = `
			<td>${reservation.id}</td>
			<td>
				${reservation.first_name}
				${reservation.last_name}
			</td>
			<td>${reservation.shuttle_date}</td>
			<td>$${Number(reservation.price).toFixed(2)}</td>
			<td>${reservation.payment_status}</td>
		`;

		tableBody.appendChild(row);
	}
}