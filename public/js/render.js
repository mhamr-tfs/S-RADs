import { state } from "./state.js";
import { getFilteredReservations } from "./filters.js";
import { driverOptions, statusOptions, paymentOptions, getPaymentClass, getStatusClass, formatPhoneNumber, formatElapsedTime, getElapsedClass } from "./formatters.js";
import { attachReservationListeners } from "./events.js";

export function renderSummary(reservations) {
	const count = (status) => reservations.filter((reservation) => reservation.status === status).length;
	document.getElementById("scheduled-count").textContent = count("Scheduled");
	document.getElementById("progress-count").textContent = count("In Progress");
	document.getElementById("completed-count").textContent = count("Completed");
	document.getElementById("cancelled-count").textContent = count("Cancelled");
}

export function renderDriverAvailability(reservations) {
	const container = document.getElementById("driver-status");
	container.innerHTML = "";
	state.drivers.forEach((driver) => {
		const trip = reservations.find((reservation) => reservation.driver === driver.name && reservation.status === "In Progress");
		if (!trip) {
			container.innerHTML += `<div class="driver-card driver-available"><div class="driver-card-header"><span class="driver-indicator">🟢</span><span>${driver.name}</span></div><div class="driver-state">Available</div></div>`;
			return;
		}
		const customer = [trip.first_name, trip.last_name].filter(Boolean).join(" ");
		container.innerHTML += `<div class="driver-card driver-busy"><div class="driver-card-header"><span class="driver-indicator">🔵</span><span>${driver.name}</span></div><div class="driver-state">On Shuttle</div><div class="driver-details"><div><strong>Customer:</strong> ${customer || "Not listed"}</div><div><strong>Route:</strong> ${trip.launch_site || ""} → ${trip.takeout_site || ""}</div><div><strong>Elapsed:</strong> ${formatElapsedTime(trip.started_at, trip.completed_at, trip.status)}</div><div><strong>Expected Finish:</strong> ${trip.expected_takeout_time || "Not provided"}</div></div></div>`;
	});
}

export function renderReservations() {
	const reservations = getFilteredReservations();
	const table = document.getElementById("reservations-table");
	if (!reservations.length) {
		table.innerHTML = '<tr><td colspan="10">No matching reservations.</td></tr>';
		return;
	}

	table.innerHTML = reservations.map((r) => `
		<tr>
			<td>${r.expected_takeout_time || ""}</td>
			<td>${r.first_name || ""} ${r.last_name || ""}</td>
			<td class="contact-cell">${r.phone ? `<a href="tel:${r.phone}">${formatPhoneNumber(r.phone)}</a>` : "No phone provided"}${r.email ? `<br><small>${r.email}</small>` : ""}</td>
			<td>${r.launch_site || ""} → ${r.takeout_site || ""}</td>
			<td>${r.vehicle_color || ""} ${r.vehicle_year || ""} ${r.vehicle_make || ""} ${r.vehicle_model || ""}<br>${r.license_state || ""}${r.license_county ? `${r.license_county}-` : ""}${r.license_plate || ""}</td>
			<td class="keys-cell"><strong>${r.key_location || "Not provided"}</strong>${r.key_location === "Other" && r.key_location_other ? `<br><small>${r.key_location_other}</small>` : ""}</td>
			<td><select class="driver-select" data-id="${r.id}">${driverOptions(r.driver)}</select></td>
			<td><select class="status-select ${getStatusClass(r.status)}" data-id="${r.id}">${statusOptions(r.status)}</select></td>
			<td class="elapsed-time ${getElapsedClass(r.status)}">${formatElapsedTime(r.started_at, r.completed_at, r.status)}</td>
			<td><div class="payment-method">${r.payment_method || "Not selected"}</div><select class="payment-select ${getPaymentClass(r.payment_status)}" data-id="${r.id}">${paymentOptions(r.payment_status)}</select></td>
		</tr>`).join("");
	attachReservationListeners();
}

export function renderDashboardError(message) {
	document.getElementById("reservations-table").innerHTML = `<tr><td colspan="10">${message}</td></tr>`;
}
