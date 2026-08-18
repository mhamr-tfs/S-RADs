let routes = [];
let lodgingBenefitVerified = false;

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
        document.getElementById(
                "is-two-rivers-guest"
        );

const bookingSection =
        document.getElementById(
                "two-rivers-booking-section"
        );

const bookingNumberInput =
        document.getElementById(
                "sirvoy-booking-number"
        );

const verifyBookingButton =
        document.getElementById(
                "verify-two-rivers-booking"
        );

const lodgingValidationMessage =
        document.getElementById(
                "lodging-validation-message"
        );

guestCheckbox.addEventListener(
        "change",
        () => {
                lodgingBenefitVerified = false;

                if (guestCheckbox.checked) {
                        bookingSection.hidden = false;
                } else {
                        bookingSection.hidden = true;
                        bookingNumberInput.value = "";
                        lodgingValidationMessage.textContent = "";
                }

                updatePaymentCalculator();
        }
);
verifyBookingButton.addEventListener(
        "click",
        async () => {
                const bookingId =
                        bookingNumberInput.value.trim();

                const shuttleDate =
                        document.querySelector(
                                '[name="shuttle_date"]'
                        ).value;

                lodgingBenefitVerified = false;

                if (!bookingId) {
                        lodgingValidationMessage.textContent =
                                "Enter your Two Rivers booking number.";

                        updatePaymentCalculator();
                        return;
                }

                if (!shuttleDate) {
                        lodgingValidationMessage.textContent =
                                "Select your shuttle date before verifying the motel booking.";

                        updatePaymentCalculator();
                        return;
                }

                lodgingValidationMessage.textContent =
                        "Verifying booking...";

                try {
                        const response =
                                await fetch(
                                        "/api/benefits/lodging/validate",
                                        {
                                                method: "POST",

                                                headers: {
                                                        "Content-Type":
                                                                "application/json",
                                                },

                                                body: JSON.stringify({
                                                        bookingId,
                                                        shuttleDate,
                                                }),
                                        }
                                );

                        const result =
                                await response.json();

                        if (!response.ok) {
                                throw new Error(
                                        "Unable to verify booking."
                                );
                        }

                        if (!result.valid) {
                                lodgingValidationMessage.textContent =
                                        "We could not verify that Two Rivers booking number.";

                                updatePaymentCalculator();
                                
                        }

                        if (!result.eligible) {
                                if (
                                        result.reason ===
                                        "not_direct_booking"
                                ) {
                                        lodgingValidationMessage.textContent =
                                                "Your motel reservation is valid, but complimentary shuttle service is available only for reservations booked directly with Two Rivers Inn.";
                                } else if (
                                        result.reason ===
                                        "booking_cancelled"
                                ) {
                                        lodgingValidationMessage.textContent =
                                                "That Two Rivers reservation has been cancelled.";
                                } else if (
                                        result.reason ===
                                        "outside_stay_dates"
                                ) {
                                        lodgingValidationMessage.textContent =
                                                "The shuttle date is outside the dates of this motel stay.";
                                } else {
                                        lodgingValidationMessage.textContent =
                                                "This motel reservation does not qualify for complimentary shuttle service.";
                                }

                                updatePaymentCalculator();
                                return;
                        }

                        if (
                                result.benefitAvailable ===
                                false
                        ) {
                                lodgingValidationMessage.textContent =
                                        "This reservation qualifies, but the complimentary shuttle allowance for this date has already been used.";

                                updatePaymentCalculator();
                                return;
                        }

                        lodgingBenefitVerified = true;

                        lodgingValidationMessage.textContent =
                                "✓ Two Rivers reservation verified. This shuttle is included with your stay.";

                        updatePaymentCalculator();
                } catch (error) {
        console.error(
                "Two Rivers booking verification failed:",
                error
        );

        lodgingValidationMessage.textContent =
                "We could not verify the motel booking right now. Please try again.";

        updatePaymentCalculator();
			}
	}
);

function updatePaymentCalculator() {
        const price =
                Number(
                        document.getElementById(
                                "price"
                        ).value || 0
                );

        const amountDue =
                document.getElementById(
                        "amount-due"
                );

        const paymentNote =
                document.getElementById(
                        "payment-note"
                );

        if (
                guestCheckbox.checked &&
                lodgingBenefitVerified
        ) {
                amountDue.textContent =
                        "$0.00";

                paymentNote.textContent =
                        "Payment included: verified Two Rivers Inn reservation.";

                return;
        }

        amountDue.textContent =
                `$${price.toFixed(2)}`;

        paymentNote.textContent = "";
}
bookingNumberInput.addEventListener(
        "input",
        () => {
                lodgingBenefitVerified = false;
                lodgingValidationMessage.textContent = "";
                updatePaymentCalculator();
        }
);

document
        .querySelector(
                '[name="shuttle_date"]'
        )
        .addEventListener(
                "change",
                () => {
                        lodgingBenefitVerified = false;
                        lodgingValidationMessage.textContent = "";
                        updatePaymentCalculator();
                }
        );

		document
	.getElementById("reservation-form")
	.addEventListener(
		"submit",
		async function (event) {
			event.preventDefault();
			console.log("S-RADs submit handler fired");
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
        lodgingBenefitVerified
                ? "Yes"
                : "No";

reservation.sirvoy_booking_number =
        bookingNumberInput.value.trim();

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
						"/api/public/reservations",
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

				const shouldUseSquare =
        reservation.payment_method === "Square" &&
        data.reservation_id &&
        !lodgingBenefitVerified;

if (shouldUseSquare) {
	message.textContent =
		"Reservation created. Redirecting to secure Square checkout...";

	const paymentResponse = await fetch(
		"/api/square/payment-link",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				reservation_id: data.reservation_id,
			}),
		}
	);

	const paymentData =
		await paymentResponse.json();

	if (
		!paymentResponse.ok ||
		!paymentData.success ||
		!paymentData.url
	) {
		throw new Error(
			paymentData.message ||
				"Reservation was created, but Square checkout could not be started."
		);
	}

	window.location.href = paymentData.url;
	return;
}

message.textContent =
	vehiclePhoto &&
	vehiclePhoto.size > 0
		? "Reservation and vehicle photo submitted successfully."
		: "Reservation submitted successfully.";

form.reset();
lodgingBenefitVerified = false;

bookingSection.hidden = true;
bookingNumberInput.value = "";
lodgingValidationMessage.textContent = "";

				document.getElementById(
					"license-county-group"
				).style.display = "none";

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