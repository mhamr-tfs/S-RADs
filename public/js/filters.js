import { state } from "./state.js";

export function getFilteredReservations() {
	const searchValue = document.getElementById("reservation-search").value.trim().toLowerCase();
	const statusValue = document.getElementById("status-filter").value;
	const paymentValue = document.getElementById("payment-filter").value;

	return state.reservations.filter((reservation) => {
		const searchableText = [
			reservation.first_name,
			reservation.last_name,
			reservation.phone,
			reservation.email,
			reservation.launch_site,
			reservation.takeout_site,
			reservation.vehicle_year,
			reservation.vehicle_make,
			reservation.vehicle_model,
			reservation.vehicle_color,
			reservation.license_plate,
			reservation.license_county,
			reservation.license_state,
			reservation.driver,
		].filter(Boolean).join(" ").toLowerCase();

		const matchesSearch = !searchValue || searchableText.includes(searchValue);
		const matchesStatus = !statusValue || reservation.status === statusValue;
		const matchesPayment = !paymentValue || reservation.payment_status === paymentValue;
		return matchesSearch && matchesStatus && matchesPayment;
	});
}
