/**
 * S-RADS Developer Tools
 *
 * These utilities exist solely to assist development and testing.
 * They should never be exposed to production users.
 */
import {
	fetchDevStatus,
	clearTestReservations,
} from "./dev-api.js";

import {
	renderDevStatus,
	renderDevError,
} from "./dev-render.js";

async function loadDevTools() {
	try {
		const status = await fetchDevStatus();
		renderDevStatus(status);
	} catch (error) {
		renderDevError(error);
	}
}

async function handleClearReservations() {
	const confirmationInput =
		document.getElementById("clear-confirmation");

	const resultElement =
		document.getElementById("clear-result");

	const clearButton =
		document.getElementById("clear-reservations");

	const confirmation =
		confirmationInput.value.trim();

	if (confirmation !== "CLEAR TEST DATA") {
		resultElement.textContent =
			'Type "CLEAR TEST DATA" exactly before continuing.';

		return;
	}

	const finalConfirmation = window.confirm(
		"This will permanently remove every reservation from the local test database.\n\nRoutes and drivers will remain.\n\nAre you really sure?"
	);

	if (!finalConfirmation) {
		resultElement.textContent =
			"Clear operation cancelled.";

		return;
	}

	clearButton.disabled = true;
	resultElement.textContent =
		"Clearing test reservations...";

	try {
		const result =
			await clearTestReservations(confirmation);

		resultElement.textContent =
			result.message;

		confirmationInput.value = "";

		await loadDevTools();
	} catch (error) {
		console.error(
			"Clear reservations failed:",
			error
		);

		resultElement.textContent =
			error.message;
	} finally {
		clearButton.disabled = false;
	}
}

document
	.getElementById("clear-reservations")
	.addEventListener(
		"click",
		handleClearReservations
	);

loadDevTools();