/**
 * S-RADS Developer Tools
 *
 * These utilities exist solely to assist development and testing.
 * They should never be exposed to production users.
 */
export function renderDevStatus(status) {
	document.getElementById("worker-status").textContent =
		"🟢 Connected";

	document.getElementById("database-status").textContent =
		"🟢 Connected";

	document.getElementById("reservation-count").textContent =
		status.reservationCount;

	document.getElementById("driver-count").textContent =
		status.driverCount;

	document.getElementById("route-count").textContent =
		status.routeCount;
}

export function renderDevError(error) {
	console.error("Developer tools failed to load:", error);

	document.getElementById("worker-status").textContent =
		"🔴 Error";

	document.getElementById("database-status").textContent =
		"🔴 Error";
}