let routes = [];

			function loadRoutes() {
				fetch("/api/routes")
					.then((response) => response.json())
					.then((routeList) => {
						routes = routeList;

						const routeSelect = document.getElementById("route-select");
						routeSelect.innerHTML = '<option value="">Select Shuttle Route</option>';

						routes.forEach((route) => {
							const option = document.createElement("option");
							option.value = route.id;
							option.textContent = `${route.launch_site} → ${route.takeout_site} — $${route.price}`;
							routeSelect.appendChild(option);
						});
					});
			}

			function updatePaymentCalculator() {
				const price = Number(document.getElementById("price").value || 0);
				const isTwoRiversGuest = document.querySelector('[name="is_two_rivers_guest"]').checked;
				const isDirectBooking = document.querySelector('[name="two_rivers_direct_booking"]').checked;

				const amountDue = document.getElementById("amount-due");
				const paymentNote = document.getElementById("payment-note");

				if (isTwoRiversGuest && isDirectBooking) {
					amountDue.textContent = "$0.00";
					paymentNote.textContent = "Payment included: Two Rivers Inn direct booking.";
					return;
				}

				amountDue.textContent = `$${price.toFixed(2)}`;
				paymentNote.textContent = "";
			}

			document.getElementById("route-select").addEventListener("change", function () {
				const selectedRouteId = Number(this.value);
				const selectedRoute = routes.find((route) => route.id === selectedRouteId);

				if (!selectedRoute) {
					document.getElementById("route-price").textContent = "$0.00";
					document.getElementById("launch_site").value = "";
					document.getElementById("takeout_site").value = "";
					document.getElementById("price").value = "";
					updatePaymentCalculator();
					return;
				}

				document.getElementById("route-price").textContent = `$${selectedRoute.price.toFixed(2)}`;
				document.getElementById("launch_site").value = selectedRoute.launch_site;
				document.getElementById("takeout_site").value = selectedRoute.takeout_site;
				document.getElementById("price").value = selectedRoute.price;

				updatePaymentCalculator();
			});

			const guestCheckbox = document.querySelector('[name="is_two_rivers_guest"]');
			const directBookingCheckbox = document.querySelector('[name="two_rivers_direct_booking"]');
document.querySelector('[name="license_state"]').addEventListener("change", function () {
	const countyField = document.getElementById("license_county");

	if (this.value === "WY") {
		countyField.style.display = "block";
	} else {
		countyField.style.display = "none";
		countyField.value = "";
	}
});
			guestCheckbox.addEventListener("change", function () {
				if (guestCheckbox.checked) {
					directBookingCheckbox.disabled = false;
				} else {
					directBookingCheckbox.checked = false;
					directBookingCheckbox.disabled = true;
				}

				updatePaymentCalculator();
			});

			directBookingCheckbox.addEventListener("change", updatePaymentCalculator);

			function loadReservations() {
				fetch("/api/reservations")
					.then((response) => response.json())
					.then((reservations) => {
						const table = document.getElementById("reservations-table");

						if (reservations.length === 0) {
							table.innerHTML = '<tr><td colspan="7">No reservations yet.</td></tr>';
							return;
						}

						table.innerHTML = reservations.map((reservation) => `
							<tr>
								<td>${reservation.expected_takeout_time || ""}</td>
								<td>${reservation.first_name || ""} ${reservation.last_name || ""}</td>
								<td>${reservation.launch_site || ""} → ${reservation.takeout_site || ""}</td>
								<td>
	${reservation.vehicle_color || ""} ${reservation.vehicle_make || ""} ${reservation.vehicle_model || ""}
	<br>
	${reservation.license_state || ""} ${reservation.license_county || ""}-${reservation.license_plate || ""}
</td>
								<td>$${Number(reservation.price || 0).toFixed(2)}</td>
								<td>${reservation.payment_method || ""} / ${reservation.payment_status || ""}</td>
								<td>${reservation.status || ""}</td>
							</tr>
						`).join("");
					});
			}

			document.getElementById("reservation-form").addEventListener("submit", function (event) {
				event.preventDefault();

				const form = event.target;
				const formData = new FormData(form);
				const reservation = Object.fromEntries(formData.entries());

				reservation.is_two_rivers_guest = formData.has("is_two_rivers_guest") ? "Yes" : "No";
				reservation.two_rivers_direct_booking = formData.has("two_rivers_direct_booking") ? "Yes" : "No";
				reservation.is_guide = "No";

				fetch("/api/reservations", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(reservation),
				})
					.then((response) => response.json())
					.then((data) => {
						document.getElementById("form-message").textContent = data.message;
						form.reset();

						directBookingCheckbox.checked = false;
						directBookingCheckbox.disabled = true;

						document.getElementById("route-price").textContent = "$0.00";
						document.getElementById("amount-due").textContent = "$0.00";
						document.getElementById("payment-note").textContent = "";
						document.getElementById("launch_site").value = "";
						document.getElementById("takeout_site").value = "";
						document.getElementById("price").value = "";

						loadReservations();
					});
			});

			loadRoutes();
			loadReservations();