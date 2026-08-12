/**
 * S-RADS Developer Tools
 *
 * These utilities exist solely to assist development and testing.
 * They should never be exposed to production users.
 */

export async function fetchDevStatus() {
	const [
		statusResponse,
		reservationsResponse,
		driversResponse,
		routesResponse,
	] = await Promise.all([
		fetch("/api/status"),
		fetch("/api/reservations"),
		fetch("/api/drivers"),
		fetch("/api/routes"),
	]);

	if (
		!statusResponse.ok ||
		!reservationsResponse.ok ||
		!driversResponse.ok ||
		!routesResponse.ok
	) {
		throw new Error(
			"One or more developer status requests failed."
		);
	}

	const [
		appStatus,
		reservations,
		drivers,
		routes,
	] = await Promise.all([
		statusResponse.json(),
		reservationsResponse.json(),
		driversResponse.json(),
		routesResponse.json(),
	]);

	return {
		version: appStatus.version,
		reservationCount: reservations.length,
		driverCount: drivers.length,
		routeCount: routes.length,
	};
}
//Clears test reservations from the database
export async function clearTestReservations(confirmation) {
	const response = await fetch("/api/dev/reservations", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			confirmation,
		}),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message ||
				`Clear request failed with status ${response.status}`
		);
	}

	return result;
}
//Adds a test reservation to the database
export async function loadDemoReservations(confirmation) {
	const response = await fetch(
		"/api/dev/demo-reservations",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				confirmation,
			}),
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message ||
				`Demo data request failed with status ${response.status}`
		);
	}

	return result;
}