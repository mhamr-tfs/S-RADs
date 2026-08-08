import { updateReservation } from "./api.js";
import { getStatusClass, getPaymentClass } from "./formatters.js";

let refreshDashboard;
let renderReservations;

export function configureEventCallbacks(callbacks) {
	refreshDashboard = callbacks.onRefreshDashboard;
	renderReservations = callbacks.onRenderReservations;
}

async function saveReservation(id, driver, status, paymentStatus) {
	try {
		const data = await updateReservation(id, driver, status, paymentStatus);
		console.log(data.message);
		await refreshDashboard();
	} catch (error) {
		console.error("Reservation update failed:", error);
		alert("The reservation did not save. Please refresh the dashboard and try again.");
	}
}

export function attachReservationListeners() {
	document.querySelectorAll(".driver-select").forEach((select) => {
		select.addEventListener("change", function () {
			const row = this.closest("tr");
			saveReservation(Number(this.dataset.id), this.value, row.querySelector(".status-select").value, row.querySelector(".payment-select").value);
		});
		document.querySelectorAll(".photo-button").forEach((button) => {
	button.addEventListener("click", function () {
		const reservationId = Number(this.dataset.reservationId);

		console.log("Open photos for reservation:", reservationId);
		alert(`Photos for reservation ${reservationId}`);
	});
});
	});

	document.querySelectorAll(".status-select").forEach((select) => {
		select.addEventListener("change", function () {
			const row = this.closest("tr");
			this.className = "status-select " + getStatusClass(this.value);
			saveReservation(Number(this.dataset.id), row.querySelector(".driver-select").value, this.value, row.querySelector(".payment-select").value);
		});
	});

	document.querySelectorAll(".payment-select").forEach((select) => {
		select.addEventListener("change", function () {
			const row = this.closest("tr");
			this.className = "payment-select " + getPaymentClass(this.value);
			saveReservation(Number(this.dataset.id), row.querySelector(".driver-select").value, row.querySelector(".status-select").value, this.value);
		});
	});
}

export function attachFilterListeners() {
	document.getElementById("reservation-search").addEventListener("input", renderReservations);
	document.getElementById("status-filter").addEventListener("change", renderReservations);
	document.getElementById("payment-filter").addEventListener("change", renderReservations);
	document.getElementById("clear-filters").addEventListener("click", () => {
		document.getElementById("reservation-search").value = "";
		document.getElementById("status-filter").value = "";
		document.getElementById("payment-filter").value = "";
		renderReservations();
	});

}
