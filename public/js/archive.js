import { loadAppVersion } from "./app-version.js";

async function fetchArchivedReservations() {
        const response =
                await fetch(
                        "/api/reservations/archived"
                );

        if (!response.ok) {
                throw new Error(
                        `Archived reservations request failed with status ${response.status}`
                );
        }

        return response.json();
}

async function restoreReservation(
        reservationId
) {
        const response =
                await fetch(
                        "/api/reservations/restore",
                        {
                                method: "PATCH",
                                headers: {
                                        "Content-Type":
                                                "application/json",
                                },
                                body: JSON.stringify({
                                        id: reservationId,
                                }),
                        }
                );

        if (!response.ok) {
                throw new Error(
                        `Restore request failed with status ${response.status}`
                );
        }

        return response.json();
}

function formatDate(value) {
        if (!value) {
                return "";
        }

        return new Date(
                value
        ).toLocaleString();
}

function renderArchivedReservations(
        reservations
) {
        const table =
                document.getElementById(
                        "archive-table"
                );

        if (!reservations.length) {
                table.innerHTML = `
                        <tr>
                                <td colspan="8">
                                        No archived reservations.
                                </td>
                        </tr>
                `;

                return;
        }

        table.innerHTML =
                reservations
                        .map(
                                (reservation) => `
                                        <tr>
                                                <td>
                                                        ${reservation.shuttle_date || ""}
                                                </td>

                                                <td>
                                                        ${reservation.first_name || ""}
                                                        ${reservation.last_name || ""}
                                                </td>

                                                <td>
                                                        ${reservation.launch_site || ""}
                                                        →
                                                        ${reservation.takeout_site || ""}
                                                </td>

                                                <td>
                                                        ${reservation.vehicle_color || ""}
                                                        ${reservation.vehicle_year || ""}
                                                        ${reservation.vehicle_make || ""}
                                                        ${reservation.vehicle_model || ""}
                                                </td>

                                                <td>
                                                        ${reservation.driver || "Unassigned"}
                                                </td>

                                                <td>
                                                        ${reservation.status || ""}
                                                </td>

                                                <td>
                                                        ${formatDate(
                                                                reservation.archived_at
                                                        )}
                                                </td>

                                                <td>
                                                        <button
                                                                type="button"
                                                                class="restore-button"
                                                                data-reservation-id="${reservation.id}"
                                                        >
                                                                Restore
                                                        </button>
                                                </td>
                                        </tr>
                                `
                        )
                        .join("");

        attachRestoreListeners();
}

function attachRestoreListeners() {
        document
                .querySelectorAll(
                        ".restore-button"
                )
                .forEach(
                        (button) => {
                                button.addEventListener(
                                        "click",
                                        async function () {
                                                const reservationId =
                                                        Number(
                                                                this.dataset
                                                                        .reservationId
                                                        );

                                                const confirmed =
                                                        confirm(
                                                                `Restore reservation #${reservationId} to the active dashboard?`
                                                        );

                                                if (!confirmed) {
                                                        return;
                                                }

                                                try {
                                                        this.disabled = true;
                                                        this.textContent =
                                                                "Restoring...";

                                                        await restoreReservation(
                                                                reservationId
                                                        );

                                                        await loadArchive();
                                                } catch (error) {
                                                        console.error(
                                                                "Reservation restore failed:",
                                                                error
                                                        );

                                                        this.disabled = false;
                                                        this.textContent =
                                                                "Restore";

                                                        alert(
                                                                "The reservation could not be restored."
                                                        );
                                                }
                                        }
                                );
                        }
                );
}

async function loadArchive() {
        const table =
                document.getElementById(
                        "archive-table"
                );

        try {
                const reservations =
                        await fetchArchivedReservations();

                renderArchivedReservations(
                        reservations
                );
        } catch (error) {
                console.error(
                        "Archive loading failed:",
                        error
                );

                table.innerHTML = `
                        <tr>
                                <td colspan="8">
                                        The archive could not be loaded.
                                </td>
                        </tr>
                `;
        }
}

loadAppVersion();
loadArchive();