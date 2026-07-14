import { state } from "./state.js";

export function driverOptions(selectedDriver) {
	let options = '<option value="Unassigned">Unassigned</option>';
	state.drivers.forEach((driver) => {
		const selected = driver.name === selectedDriver ? "selected" : "";
		options += `<option value="${driver.name}" ${selected}>${driver.name}</option>`;
	});
	return options;
}

export function statusOptions(selectedStatus) {
	return ["Scheduled", "In Progress", "Completed", "Cancelled"]
		.map((status) => `<option value="${status}" ${status === selectedStatus ? "selected" : ""}>${status}</option>`)
		.join("");
}

export function paymentOptions(selectedStatus) {
	return ["Pending", "Paid", "Included", "Waived", "Refunded"]
		.map((status) => `<option value="${status}" ${status === selectedStatus ? "selected" : ""}>${status}</option>`)
		.join("");
}

export function getPaymentClass(status) {
	switch (status) {
		case "Pending": return "payment-pending";
		case "Paid": return "payment-paid";
		case "Included":
		case "Waived": return "payment-included";
		case "Refunded": return "payment-refunded";
		default: return "";
	}
}

export function getStatusClass(status) {
	switch (status) {
		case "Scheduled": return "status-scheduled";
		case "In Progress": return "status-progress";
		case "Completed": return "status-completed";
		case "Cancelled": return "status-cancelled";
		default: return "";
	}
}

export function formatPhoneNumber(phone) {
	if (!phone) return "No phone provided";
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
	if (digits.length === 11 && digits.startsWith("1")) return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
	return phone;
}

export function formatElapsedTime(startedAt, completedAt, status) {
	if (!startedAt) return "—";
	const startTime = new Date(startedAt);
	const endTime = status === "Completed" && completedAt ? new Date(completedAt) : new Date();
	const elapsedMilliseconds = endTime - startTime;
	if (elapsedMilliseconds < 0 || Number.isNaN(elapsedMilliseconds)) return "—";
	const totalMinutes = Math.floor(elapsedMilliseconds / 60000);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
}

export function getElapsedClass(status) {
	if (status === "In Progress") return "elapsed-active";
	if (status === "Completed") return "elapsed-completed";
	return "";
}
