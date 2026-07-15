/**
 * S-RADS Developer Tools
 *
 * These utilities exist solely to assist development and testing.
 * They should never be exposed to production users.
 */
export async function fetchDevStatus() {
	const [reservationsResponse, driversResponse, routesResponse] =
		await Promise.all([
			fetch("/api/reservations"),
			fetch("/api/drivers"),
			fetch("/api/routes"),
		]);

	if (
		!reservationsResponse.ok ||
		!driversResponse.ok ||
		!routesResponse.ok
	) {
		throw new Error("One or more developer status requests failed.");
	}

	const [reservations, drivers, routes] = await Promise.all([
		reservationsResponse.json(),
		driversResponse.json(),
		routesResponse.json(),
	]);

	return {
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