/**
 * S-RADS Developer Tools
 *
 * These utilities exist solely to assist development and testing.
 * They should never be exposed to production users.
 */
import {
	fetchDevStatus,
	clearTestReservations,
    loadDemoReservations,
} from "./dev-api.js";

import {
	renderDevStatus,
	renderDevError,
} from "./dev-render.js";

console.log("dev-tools.js loaded");
async function loadDevTools() {
	console.log("loadDevTools() started");
	try {
		const status = await fetchDevStatus();
		renderDevStatus(status);
	} catch (error) {
		renderDevError(error);
	}
}
/**  Clear test reservations from the database
*/
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
/**  Load demo reservations into the database
*/
async function handleLoadDemoReservations() {
	const confirmationInput =
		document.getElementById("demo-confirmation");

	const resultElement =
		document.getElementById("demo-result");

	const loadButton =
		document.getElementById(
			"load-demo-reservations"
		);

	const confirmation =
		confirmationInput.value.trim();

	if (confirmation !== "LOAD DEMO DATA") {
		resultElement.textContent =
			'Type "LOAD DEMO DATA" exactly before continuing.';

		return;
	}

	loadButton.disabled = true;
	resultElement.textContent =
		"Loading demo reservations...";

	try {
		const result =
			await loadDemoReservations(confirmation);

		resultElement.textContent =
			result.message;

		confirmationInput.value = "";

		await loadDevTools();
	} catch (error) {
		console.error(
			"Loading demo reservations failed:",
			error
		);

		resultElement.textContent =
			error.message;
	} finally {
		loadButton.disabled = false;
	}
}
document
	.getElementById("load-demo-reservations")
	.addEventListener(
		"click",
		handleLoadDemoReservations
	);

document
	.getElementById("clear-reservations")
	.addEventListener(
		"click",
		handleClearReservations
	);

loadDevTools();