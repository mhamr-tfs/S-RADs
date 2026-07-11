let drivers = [];
let allReservations = [];

function getFilteredReservations() {
	const searchValue = document
		.getElementById("reservation-search")
		.value
		.trim()
		.toLowerCase();

	const statusValue =
		document.getElementById("status-filter").value;

	const paymentValue =
		document.getElementById("payment-filter").value;

	return allReservations.filter((reservation) => {
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
		]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();

		const matchesSearch =
			!searchValue || searchableText.includes(searchValue);

		const matchesStatus =
			!statusValue || reservation.status === statusValue;

		const matchesPayment =
			!paymentValue ||
			reservation.payment_status === paymentValue;

		return matchesSearch && matchesStatus && matchesPayment;
	});
}

function driverOptions(selectedDriver) {
	let options = '<option value="Unassigned">Unassigned</option>';

	drivers.forEach((driver) => {
		const selected = driver.name === selectedDriver ? "selected" : "";
		options += `<option value="${driver.name}" ${selected}>${driver.name}</option>`;
	});

	return options;
}

function statusOptions(selectedStatus) {
	const statuses = ["Scheduled", "In Progress", "Completed", "Cancelled"];

	return statuses.map((status) => {
		const selected = status === selectedStatus ? "selected" : "";
		return `<option value="${status}" ${selected}>${status}</option>`;
	}).join("");
}
function paymentOptions(selectedStatus) {
	const statuses = [
		"Pending",
		"Paid",
		"Included",
		"Waived",
		"Refunded",
	];

	return statuses
		.map((status) => {
			const selected = status === selectedStatus ? "selected" : "";

			return `
				<option value="${status}" ${selected}>
					${status}
				</option>
			`;
		})
		.join("");
}

function getPaymentClass(status) {
	switch (status) {
		case "Pending":
			return "payment-pending";

		case "Paid":
			return "payment-paid";

		case "Included":
		case "Waived":
			return "payment-included";

		case "Refunded":
			return "payment-refunded";

		default:
			return "";
	}
}
function getStatusClass(status) {
	switch (status) {
		case "Scheduled":
			return "status-scheduled";

		case "In Progress":
			return "status-progress";

		case "Completed":
			return "status-completed";

		case "Cancelled":
			return "status-cancelled";

		default:
			return "";
	}
}
function formatElapsedTime(startedAt, completedAt, status) {
	if (!startedAt) {
		return "—";
	}

	const startTime = new Date(startedAt);
	const endTime =
		status === "Completed" && completedAt
			? new Date(completedAt)
			: new Date();

	const elapsedMilliseconds = endTime - startTime;

	if (elapsedMilliseconds < 0 || Number.isNaN(elapsedMilliseconds)) {
		return "—";
	}

	const totalMinutes = Math.floor(elapsedMilliseconds / 60000);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	if (hours > 0) {
		return `${hours} hr ${minutes} min`;
	}

	return `${minutes} min`;
}

function getElapsedClass(status) {
	if (status === "In Progress") {
		return "elapsed-active";
	}

	if (status === "Completed") {
		return "elapsed-completed";
	}

	return "";
}
function updateReservation(id, driver, status, paymentStatus) {
	fetch("/api/reservations", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id,
		driver,
		status,
		payment_status: paymentStatus,
}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Update failed with status ${response.status}`);
			}

			return response.json();
		})
		.then((data) => {
			console.log(data.message);
			loadDashboard();
		})
		.catch((error) => {
			console.error("Reservation update failed:", error);
			alert("The reservation did not save. Please refresh the dashboard and try again.");
		});
}

function loadDashboard() {
	Promise.all([
		fetch("/api/reservations").then((response) => response.json()),
		fetch("/api/drivers").then((response) => response.json()),
	]).then(([reservations, driverList]) => {
		drivers = driverList;
		allReservations = reservations;

		const driverContainer = document.getElementById("driver-status");

		driverContainer.innerHTML = "";

		drivers.forEach((driver) => {
			const activeTrip = reservations.find(
				(reservation) =>
					reservation.driver === driver.name &&
					reservation.status === "In Progress"
			);

			if (activeTrip) {
				driverContainer.innerHTML += `
					<div class="driver-card driver-busy">
						🔵 ${driver.name}<br>
						On Shuttle<br>
						${activeTrip.launch_site} → ${activeTrip.takeout_site}
					</div>
				`;
			} else {
				driverContainer.innerHTML += `
					<div class="driver-card driver-available">
						🟢 ${driver.name}<br>
						Available
					</div>
				`;
			}
		});

		const scheduled = reservations.filter(
			(reservation) => reservation.status === "Scheduled"
		).length;

		const progress = reservations.filter(
			(reservation) => reservation.status === "In Progress"
		).length;

		const completed = reservations.filter(
			(reservation) => reservation.status === "Completed"
		).length;

		const cancelled = reservations.filter(
			(reservation) => reservation.status === "Cancelled"
		).length;

		document.getElementById("scheduled-count").textContent = scheduled;
		document.getElementById("progress-count").textContent = progress;
		document.getElementById("completed-count").textContent = completed;
		document.getElementById("cancelled-count").textContent = cancelled;

		renderReservations();
	});
}
function renderReservations() {
	const reservations = getFilteredReservations();
	const table = document.getElementById("reservations-table");

	if (reservations.length === 0) {
		table.innerHTML =
			'<tr><td colspan="8">No matching reservations.</td></tr>';
		return;
	}

	table.innerHTML = reservations
		.map(
			(reservation) => `
				<tr>
					<td>${reservation.expected_takeout_time || ""}</td>

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
						<br>

						${reservation.license_state || ""}
						${
							reservation.license_county
								? `${reservation.license_county}-`
								: ""
						}
						${reservation.license_plate || ""}
					</td>

					<td>
						<select
							class="driver-select"
							data-id="${reservation.id}"
						>
							${driverOptions(reservation.driver)}
						</select>
					</td>

					<td>
						<select
							class="status-select ${getStatusClass(reservation.status)}"
							data-id="${reservation.id}"
						>
							${statusOptions(reservation.status)}
						</select>
					</td>

					<td class="elapsed-time ${getElapsedClass(reservation.status)}">
						${formatElapsedTime(
							reservation.started_at,
							reservation.completed_at,
							reservation.status
						)}
					</td>

					<td>
						<div class="payment-method">
							${reservation.payment_method || "Not selected"}
						</div>

						<select
							class="payment-select ${getPaymentClass(
								reservation.payment_status
							)}"
							data-id="${reservation.id}"
						>
							${paymentOptions(reservation.payment_status)}
						</select>
					</td>
				</tr>
			`
		)
		.join("");

		attachDashboardListeners();
}

function attachDashboardListeners() {
	document.querySelectorAll(".driver-select").forEach((select) => {
		select.addEventListener("change", function () {
			const id = Number(this.dataset.id);
			const row = this.closest("tr");

			const status = row.querySelector(".status-select").value;
			const paymentStatus = row.querySelector(".payment-select").value;

			updateReservation(
				id,
				this.value,
				status,
				paymentStatus
			);
		});
	});

	document.querySelectorAll(".status-select").forEach((select) => {
		select.addEventListener("change", function () {
			const id = Number(this.dataset.id);
			const row = this.closest("tr");

			const driver = row.querySelector(".driver-select").value;
			const paymentStatus = row.querySelector(".payment-select").value;

			this.className =
				"status-select " + getStatusClass(this.value);

			updateReservation(
				id,
				driver,
				this.value,
				paymentStatus
			);
		});
	});

	document.querySelectorAll(".payment-select").forEach((select) => {
		select.addEventListener("change", function () {
			const id = Number(this.dataset.id);
			const row = this.closest("tr");

			const driver = row.querySelector(".driver-select").value;
			const status = row.querySelector(".status-select").value;

			this.className =
				"payment-select " + getPaymentClass(this.value);

			updateReservation(
				id,
				driver,
				status,
				this.value
			);
		});
	});
}

document
	.getElementById("reservation-search")
	.addEventListener("input", renderReservations);

document
	.getElementById("status-filter")
	.addEventListener("change", renderReservations);

document
	.getElementById("payment-filter")
	.addEventListener("change", renderReservations);

document
	.getElementById("clear-filters")
	.addEventListener("click", function () {
		document.getElementById("reservation-search").value = "";
		document.getElementById("status-filter").value = "";
		document.getElementById("payment-filter").value = "";

		renderReservations();
	});

loadDashboard();

setInterval(loadDashboard, 30000);
