/*S-RADs Payment API
 *
 * This module provides functions to interact with the payment-related endpoints of the S-RADS API.
 * It is designed to be used in the frontend of the application to fetch payment summaries and outstanding payments.
 */
async function fetchJson(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(
			`Request failed: ${response.status} ${response.statusText}`
		);
	}

	const data = await response.json();

	if (!data.success) {
		throw new Error(data.message || "The payment request failed.");
	}

	return data;
}

export async function getPaymentSummary() {
	const data = await fetchJson("/api/reports/payments");
	return data.summary;
}

export async function getOutstandingPayments() {
	const data = await fetchJson("/api/reports/payments/outstanding");
	return data.reservations;
}