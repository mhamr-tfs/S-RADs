let routes = [];

function loadRoutes() {
	fetch("/api/routes")
		.then((response) => response.json())
		.then((routeList) => {
			routes = routeList;

			const routeSelect =
				document.getElementById("route-select");

			routeSelect.innerHTML =
				'<option value="">Choose Your Route</option>';

			routes.forEach((route) => {
				const option =
					document.createElement("option");

				option.value = route.id;

				option.textContent =
					`${route.launch_site} → ${route.takeout_site} — $${route.price}`;

				routeSelect.appendChild(option);
			});
		});
}

function updatePaymentCalculator() {
	const price = Number(
		document.getElementById("price").value || 0
	);

	const isTwoRiversGuest =
		document.querySelector(
			'[name="is_two_rivers_guest"]'
		).checked;

	const isDirectBooking =
		document.querySelector(
			'[name="two_rivers_direct_booking"]'
		).checked;

	const amountDue =
		document.getElementById("amount-due");

	const paymentNote =
		document.getElementById("payment-note");

	if (isTwoRiversGuest && isDirectBooking) {
		amountDue.textContent = "$0.00";

		paymentNote.textContent =
			"Payment included: Two Rivers Inn direct booking.";

		return;
	}

	amountDue.textContent =
		`$${price.toFixed(2)}`;

	paymentNote.textContent = "";
}

document
	.getElementById("route-select")
	.addEventListener("change", function () {
		const selectedRouteId =
			Number(this.value);

		const selectedRoute =
			routes.find(
				(route) =>
					route.id === selectedRouteId
			);

		if (!selectedRoute) {
			document.getElementById(
				"route-price"
			).textContent = "$0.00";

			document.getElementById(
				"launch_site"
			).value = "";

			document.getElementById(
				"takeout_site"
			).value = "";

			document.getElementById(
				"price"
			).value = "";

			updatePaymentCalculator();

			return;
		}

		document.getElementById(
			"route-price"
		).textContent =
			`$${selectedRoute.price.toFixed(2)}`;

		document.getElementById(
			"launch_site"
		).value =
			selectedRoute.launch_site;

		document.getElementById(
			"takeout_site"
		).value =
			selectedRoute.takeout_site;

		document.getElementById(
			"price"
		).value =
			selectedRoute.price;

		updatePaymentCalculator();
	});

const guestCheckbox =
	document.querySelector(
		'[name="is_two_rivers_guest"]'
	);

const directBookingCheckbox =
	document.querySelector(
		'[name="two_rivers_direct_booking"]'
	);

guestCheckbox.addEventListener(
	"change",
	function () {
		if (guestCheckbox.checked) {
			directBookingCheckbox.disabled =
				false;
		} else {
			directBookingCheckbox.checked =
				false;

			directBookingCheckbox.disabled =
				true;
		}

		updatePaymentCalculator();
	}
);

directBookingCheckbox.addEventListener(
	"change",
	updatePaymentCalculator
);

document
	.getElementById("reservation-form")
	.addEventListener(
		"submit",
		async function (event) {
			event.preventDefault();

			const form = event.target;
			const formData =
				new FormData(form);

			const vehiclePhoto =
				formData.get("vehicle_photo");

			formData.delete("vehicle_photo");

			const reservation =
				Object.fromEntries(
					formData.entries()
				);

			reservation.is_two_rivers_guest =
				formData.has(
					"is_two_rivers_guest"
				)
					? "Yes"
					: "No";

			reservation.two_rivers_direct_booking =
				formData.has(
					"two_rivers_direct_booking"
				)
					? "Yes"
					: "No";

			reservation.is_guide = "No";

			const message =
				document.getElementById(
					"form-message"
				);

			try {
				message.textContent =
					"Submitting reservation...";

				const response =
					await fetch(
						"/api/reservations",
						{
							method: "POST",
							headers: {
								"Content-Type":
									"application/json",
							},
							body: JSON.stringify(
								reservation
							),
						}
					);

				const data =
					await response.json();

				if (
					!response.ok ||
					!data.success
				) {
					throw new Error(
						data.message ||
							"Reservation could not be created."
					);
				}

				if (
					vehiclePhoto &&
					vehiclePhoto.size > 0
				) {
					message.textContent =
						"Reservation created. Uploading vehicle photo...";

					const photoData =
						new FormData();

					photoData.append(
						"reservation_id",
						data.reservation_id
					);

					photoData.append(
						"photo",
						vehiclePhoto
					);

					const photoResponse =
						await fetch(
							"/api/photos/upload",
							{
								method: "POST",
								body: photoData,
							}
						);

					const photoResult =
						await photoResponse.json();

					if (
						!photoResponse.ok ||
						!photoResult.success
					) {
						throw new Error(
							photoResult.message ||
								"Reservation was created, but the photo upload failed."
						);
					}
				}

				message.textContent =
					vehiclePhoto &&
					vehiclePhoto.size > 0
						? "Reservation and vehicle photo submitted successfully."
						: "Reservation submitted successfully.";

				form.reset();

				document.getElementById(
					"license-county-group"
				).style.display = "none";

				directBookingCheckbox.checked =
					false;

				directBookingCheckbox.disabled =
					true;

				document.getElementById(
					"route-price"
				).textContent = "$0.00";

				document.getElementById(
					"amount-due"
				).textContent = "$0.00";

				document.getElementById(
					"payment-note"
				).textContent = "";

				document.getElementById(
					"launch_site"
				).value = "";

				document.getElementById(
					"takeout_site"
				).value = "";

				document.getElementById(
					"price"
				).value = "";
			} catch (error) {
				console.error(
					"Reservation submission failed:",
					error
				);

				message.textContent =
					error.message ||
					"Something went wrong. Please try again.";
			}
		}
	);

document
	.querySelector(
		'[name="license_state"]'
	)
	.addEventListener(
		"change",
		function () {
			const countyGroup =
				document.getElementById(
					"license-county-group"
				);

			const countyField =
				document.getElementById(
					"license_county"
				);

			if (this.value === "WY") {
				countyGroup.style.display =
					"flex";
			} else {
				countyGroup.style.display =
					"none";

				countyField.value = "";
			}
		}
	);

loadRoutes();