export async function fetchReservations() {
	const response = await fetch("/api/reservations");
	if (!response.ok) throw new Error(`Reservations request failed with status ${response.status}`);
	return response.json();
}

export async function fetchDrivers() {
	const response = await fetch("/api/drivers");
	if (!response.ok) throw new Error(`Drivers request failed with status ${response.status}`);
	return response.json();
}

export async function updateReservation(id, driver, status, paymentStatus) {
	const response = await fetch("/api/reservations", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id, driver, status, payment_status: paymentStatus }),
	});

	if (!response.ok) throw new Error(`Update failed with status ${response.status}`);
	return response.json();
}
export async function archiveCompletedReservations() {
        const response = await fetch(
                "/api/reservations/archive-completed",
                {
                        method: "PATCH",
                }
        );

        if (!response.ok) {
                throw new Error(
                        `Archive request failed with status ${response.status}`
                );
        }

        return response.json();
}
export async function fetchCriticalChanges() {
        const response =
                await fetch(
                        "/api/reservations/critical-changes"
                );

        if (!response.ok) {
                throw new Error(
                        `Critical changes request failed with status ${response.status}`
                );
        }

        return response.json();
}

export async function acknowledgeCriticalChanges(
        reservationId
) {
        const response =
                await fetch(
                        "/api/reservations/acknowledge-changes",
                        {
                                method: "PATCH",
                                headers: {
                                        "Content-Type":
                                                "application/json",
                                },
                                body: JSON.stringify({
                                        id: reservationId,
                                        acknowledged_by: "Staff",
                                }),
                        }
                );

        if (!response.ok) {
                throw new Error(
                        `Acknowledge request failed with status ${response.status}`
                );
        }

        return response.json();
}