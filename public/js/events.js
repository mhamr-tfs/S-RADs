import {
        updateReservation,
        archiveCompletedReservations
} from "./api.js";

import { 
	getStatusClass, getPaymentClass 
} from "./formatters.js";

import { 
	state 
} from "./state.js";

let refreshDashboard;
let renderReservations;

export function configureEventCallbacks(callbacks) {
	refreshDashboard = callbacks.onRefreshDashboard;
	renderReservations = callbacks.onRenderReservations;
}

async function saveReservation(id, driver, status, paymentStatus) {
	try {
		const data = await updateReservation(
			id,
			driver,
			status,
			paymentStatus
		);

		console.log(data.message);
		await refreshDashboard();
	} catch (error) {
		console.error("Reservation update failed:", error);

		alert(
			"The reservation did not save. Please refresh the dashboard and try again."
		);
	}
}

async function loadReservationPhotos(reservationId) {
	const gallery = document.getElementById("photo-gallery");

	const selectionStatus = document.getElementById(
		"photo-selection-status"
	);

	const sendButton = document.getElementById(
		"send-completion-email"
	);

	gallery.innerHTML = "<p>Loading photos...</p>";

	selectionStatus.textContent = "0 photos selected";
	sendButton.disabled = true;

	try {
		const response = await fetch(
			`/api/photos/${reservationId}`
		);

		const data = await response.json();

		if (!response.ok || !data.success) {
			throw new Error(
				data.message || "Unable to load photos."
			);
		}

		if (data.photos.length === 0) {
			gallery.innerHTML =
				"<p>No photos uploaded yet.</p>";
			return;
		}

		gallery.innerHTML = data.photos
			.map(
				(photo) => `
					<div class="reservation-photo-option">
						<img
							src="/api/photos/file/${photo.id}"
							alt="Reservation photo"
							class="reservation-photo-thumbnail"
							data-full-src="/api/photos/file/${photo.id}"
						>

						<label>
							<input
								type="checkbox"
								class="completion-photo-checkbox"
								value="${photo.id}"
							>
							Send to customer
						</label>
					</div>
				`
			)
			.join("");

		gallery
			.querySelectorAll(
				".reservation-photo-thumbnail"
			)
			.forEach((image) => {
				image.addEventListener("click", () => {
					const viewer =
						document.getElementById(
							"photo-viewer"
						);

					const viewerImage =
						document.getElementById(
							"photo-viewer-image"
						);

					viewerImage.src =
						image.dataset.fullSrc;

					viewer.hidden = false;
				});
			});

		gallery
			.querySelectorAll(
				".completion-photo-checkbox"
			)
			.forEach((checkbox) => {
				checkbox.addEventListener(
					"change",
					() => {
						const selected =
							gallery.querySelectorAll(
								".completion-photo-checkbox:checked"
							);

						const count = selected.length;

						selectionStatus.textContent =
							count === 1
								? "1 photo selected"
								: `${count} photos selected`;

						sendButton.disabled =
							count === 0;
					}
				);
			});
	} catch (error) {
		console.error("Photo load failed:", error);

		gallery.innerHTML =
			"<p>Unable to load photos.</p>";

		selectionStatus.textContent =
			"0 photos selected";

		sendButton.disabled = true;
	}
}

async function uploadReservationPhoto(event) {
	event.preventDefault();

	const modal = document.getElementById("photo-modal");
	const fileInput = document.getElementById("photo-file");
	const status = document.getElementById(
		"photo-upload-status"
	);

	const reservationId = modal.dataset.reservationId;
	const photo = fileInput.files[0];

	if (!reservationId) {
		status.textContent = "No reservation selected.";
		return;
	}

	if (!photo) {
		status.textContent = "Choose a photo first.";
		return;
	}

	const formData = new FormData();

	formData.append("reservation_id", reservationId);
	formData.append("photo", photo);

	status.textContent = "Uploading...";

	try {
		const response = await fetch("/api/photos/upload", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		if (!response.ok || !data.success) {
			throw new Error(
				data.message || "Photo upload failed."
			);
		}

		status.textContent =
			"Photo uploaded successfully.";

		fileInput.value = "";

		await loadReservationPhotos(reservationId);
	} catch (error) {
		console.error("Photo upload failed:", error);

		status.textContent = "Photo upload failed.";
	}
}

export function attachReservationListeners() {
	document
		.querySelectorAll(".driver-select")
		.forEach((select) => {
			select.addEventListener(
				"change",
				function () {
					const row = this.closest("tr");

					saveReservation(
						Number(this.dataset.id),
						this.value,
						row.querySelector(
							".status-select"
						).value,
						row.querySelector(
							".payment-select"
						).value
					);
				}
			);
		});

	document
		.querySelectorAll(".status-select")
		.forEach((select) => {
			select.addEventListener(
				"change",
				function () {
					const row = this.closest("tr");

					this.className =
						"status-select " +
						getStatusClass(this.value);

					saveReservation(
						Number(this.dataset.id),
						row.querySelector(
							".driver-select"
						).value,
						this.value,
						row.querySelector(
							".payment-select"
						).value
					);
				}
			);
		});

	document
		.querySelectorAll(".payment-select")
		.forEach((select) => {
			select.addEventListener(
				"change",
				function () {
					const row = this.closest("tr");

					this.className =
						"payment-select " +
						getPaymentClass(
							this.value
						);

					saveReservation(
						Number(this.dataset.id),
						row.querySelector(
							".driver-select"
						).value,
						row.querySelector(
							".status-select"
						).value,
						this.value
					);
				}
			);
		});

		        document
                .querySelectorAll(".edit-button")
                .forEach((button) => {
                        button.addEventListener(
                                "click",
                                function () {
                                        const reservationId =
                                                Number(
                                                        this.dataset
                                                                .reservationId
                                                );

                                        const reservation =
                                                state.reservations.find(
                                                        (item) =>
                                                                item.id ===
                                                                reservationId
                                                );

                                        if (!reservation) {
                                                alert(
                                                        "Reservation could not be loaded."
                                                );
                                                return;
                                        }

                                        const modal =
                                                document.getElementById(
                                                        "edit-modal"
                                                );

                                        modal.dataset.reservationId =
                                                reservationId;

                                        document.getElementById(
                                                "edit-reservation-id"
                                        ).value = reservationId;

                                        document.getElementById(
                                                "edit-first-name"
                                        ).value =
                                                reservation.first_name || "";

                                        document.getElementById(
                                                "edit-last-name"
                                        ).value =
                                                reservation.last_name || "";

                                        document.getElementById(
                                                "edit-phone"
                                        ).value =
                                                reservation.phone || "";

                                        document.getElementById(
                                                "edit-email"
                                        ).value =
                                                reservation.email || "";

                                        document.getElementById(
                                                "edit-shuttle-date"
                                        ).value =
                                                reservation.shuttle_date || "";

                                        document.getElementById(
                                                "edit-takeout-time"
                                        ).value =
                                                reservation.expected_takeout_time ||
                                                "";

                                        document.getElementById(
                                                "edit-launch-site"
                                        ).value =
                                                reservation.launch_site || "";

                                        document.getElementById(
                                                "edit-takeout-site"
                                        ).value =
                                                reservation.takeout_site || "";

                                        document.getElementById(
                                                "edit-vehicle-year"
                                        ).value =
                                                reservation.vehicle_year || "";

                                        document.getElementById(
                                                "edit-vehicle-make"
                                        ).value =
                                                reservation.vehicle_make || "";

                                        document.getElementById(
                                                "edit-vehicle-model"
                                        ).value =
                                                reservation.vehicle_model || "";

                                        document.getElementById(
                                                "edit-vehicle-color"
                                        ).value =
                                                reservation.vehicle_color || "";

                                        document.getElementById(
                                                "edit-license-plate"
                                        ).value =
                                                reservation.license_plate || "";

                                        document.getElementById(
                                                "edit-license-state"
                                        ).value =
                                                reservation.license_state || "";

                                        document.getElementById(
                                                "edit-license-county"
                                        ).value =
                                                reservation.license_county || "";

                                        document.getElementById(
                                                "edit-key-location"
                                        ).value =
                                                reservation.key_location || "";

                                        document.getElementById(
                                                "edit-key-location-other"
                                        ).value =
                                                reservation.key_location_other ||
                                                "";

                                        document.getElementById(
                                                "edit-payment-method"
                                        ).value =
                                                reservation.payment_method || "";

                                        document.getElementById(
                                                "edit-special-instructions"
                                        ).value =
                                                reservation.special_instructions ||
                                                "";

                                        modal.dataset.original =
                                                JSON.stringify(
                                                        reservation
                                                );

                                        document.getElementById(
                                                "edit-critical-warning"
                                        ).hidden = true;

                                        document.getElementById(
                                                "edit-status"
                                        ).textContent = "";

                                        modal.hidden = false;
                                }
                        );
                });

	document
		.querySelectorAll(".photo-button")
		.forEach((button) => {
			button.addEventListener(
				"click",
				function () {
					const reservationId =
						Number(
							this.dataset
								.reservationId
						);

					const modal =
						document.getElementById(
							"photo-modal"
						);

					const reservationDisplay =
						document.getElementById(
							"photo-reservation-id"
						);

					reservationDisplay.textContent =
						reservationId;

					modal.dataset.reservationId =
						reservationId;

					modal.hidden = false;

					loadReservationPhotos(
						reservationId
					);
				}
			);
		});

	const photoModalClose =
		document.getElementById("photo-modal-close");

	if (photoModalClose) {
		photoModalClose.onclick = () => {
			document.getElementById(
				"photo-modal"
			).hidden = true;
		};
	}
}

        const editModalClose =
                document.getElementById(
                        "edit-modal-close"
                );

        editModalClose.addEventListener(
                "click",
                () => {
                        document.getElementById(
                                "edit-modal"
                        ).hidden = true;
                }
        );

export function attachFilterListeners() {
	        const editForm =
                document.getElementById(
                        "edit-reservation-form"
                );

        editForm.addEventListener(
                "submit",
                async (event) => {
                        event.preventDefault();

                        const modal =
                                document.getElementById(
                                        "edit-modal"
                                );

                        const status =
                                document.getElementById(
                                        "edit-status"
                                );

                        const warning =
                                document.getElementById(
                                        "edit-critical-warning"
                                );

                        const original =
                                JSON.parse(
                                        modal.dataset.original || "{}"
                                );

                        const update = {
                                id: Number(
                                        document.getElementById(
                                                "edit-reservation-id"
                                        ).value
                                ),

                                first_name:
                                        document.getElementById(
                                                "edit-first-name"
                                        ).value.trim(),

                                last_name:
                                        document.getElementById(
                                                "edit-last-name"
                                        ).value.trim(),

                                phone:
                                        document.getElementById(
                                                "edit-phone"
                                        ).value.trim(),

                                email:
                                        document.getElementById(
                                                "edit-email"
                                        ).value.trim(),

                                shuttle_date:
                                        document.getElementById(
                                                "edit-shuttle-date"
                                        ).value,

                                expected_takeout_time:
                                        document.getElementById(
                                                "edit-takeout-time"
                                        ).value,

                                launch_site:
                                        document.getElementById(
                                                "edit-launch-site"
                                        ).value.trim(),

                                takeout_site:
                                        document.getElementById(
                                                "edit-takeout-site"
                                        ).value.trim(),

                                vehicle_year:
                                        document.getElementById(
                                                "edit-vehicle-year"
                                        ).value.trim(),

                                vehicle_make:
                                        document.getElementById(
                                                "edit-vehicle-make"
                                        ).value.trim(),

                                vehicle_model:
                                        document.getElementById(
                                                "edit-vehicle-model"
                                        ).value.trim(),

                                vehicle_color:
                                        document.getElementById(
                                                "edit-vehicle-color"
                                        ).value.trim(),

                                license_plate:
                                        document.getElementById(
                                                "edit-license-plate"
                                        ).value.trim(),

                                license_state:
                                        document.getElementById(
                                                "edit-license-state"
                                        ).value.trim(),

                                license_county:
                                        document.getElementById(
                                                "edit-license-county"
                                        ).value.trim(),

                                key_location:
                                        document.getElementById(
                                                "edit-key-location"
                                        ).value.trim(),

                                key_location_other:
                                        document.getElementById(
                                                "edit-key-location-other"
                                        ).value.trim(),

                                payment_method:
                                        document.getElementById(
                                                "edit-payment-method"
                                        ).value.trim(),

                                special_instructions:
                                        document.getElementById(
                                                "edit-special-instructions"
                                        ).value.trim(),

                                changed_by: "Staff",
                        };

                        const criticalFields = [
                                "shuttle_date",
                                "expected_takeout_time",
                                "launch_site",
                                "takeout_site",
                                "vehicle_year",
                                "vehicle_make",
                                "vehicle_model",
                                "vehicle_color",
                                "license_plate",
                                "license_state",
                                "license_county",
                                "key_location",
                                "key_location_other",
                        ];

                        const criticalChanges =
                                criticalFields.filter(
                                        (field) =>
                                                String(
                                                        original[field] ?? ""
                                                ) !==
                                                String(
                                                        update[field] ?? ""
                                                )
                                );

                        if (criticalChanges.length > 0) {
                                warning.hidden = false;

                                const confirmed =
                                        confirm(
                                                "CRITICAL DISPATCH INFORMATION HAS CHANGED.\n\n" +
                                                "Changed fields:\n" +
                                                criticalChanges
                                                        .map(
                                                                (field) =>
                                                                        "• " +
                                                                        field.replaceAll(
                                                                                "_",
                                                                                " "
                                                                        )
                                                        )
                                                        .join("\n") +
                                                "\n\nSave these changes?"
                                        );

                                if (!confirmed) {
                                        return;
                                }
                        }

                        try {
                                status.textContent =
                                        "Saving changes...";

                                const response =
                                        await fetch(
                                                "/api/reservations/staff-edit",
                                                {
                                                        method: "PATCH",

                                                        headers: {
                                                                "Content-Type":
                                                                        "application/json",
                                                        },

                                                        body:
                                                                JSON.stringify(
                                                                        update
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
                                                "Reservation update failed."
                                        );
                                }

                                status.textContent =
                                        data.changes === 0
                                                ? "No changes detected."
                                                : `${data.changes} change(s) saved successfully.`;

                                await refreshDashboard();

                                if (data.changes > 0) {
                                        setTimeout(
                                                () => {
                                                        modal.hidden = true;
                                                },
                                                500
                                        );
                                }
                        } catch (error) {
                                console.error(
                                        "Staff reservation edit failed:",
                                        error
                                );

                                status.textContent =
                                        error.message ||
                                        "Reservation update failed.";
                        }
                }
        );
	document
		.getElementById("photo-upload-form")
		.addEventListener(
			"submit",
			uploadReservationPhoto
		);

	document
		.getElementById("reservation-search")
		.addEventListener(
			"input",
			renderReservations
		);

	document
		.getElementById("status-filter")
		.addEventListener(
			"change",
			renderReservations
		);

	document
		.getElementById("payment-filter")
		.addEventListener(
			"change",
			renderReservations
		);

	document
		.getElementById("clear-filters")
		.addEventListener("click", () => {
			document.getElementById(
				"reservation-search"
			).value = "";

			document.getElementById(
				"status-filter"
			).value = "";

			document.getElementById(
				"payment-filter"
			).value = "";

			renderReservations();
		});
        const archiveCompletedButton =
                document.getElementById(
                        "archive-completed"
                );

        archiveCompletedButton.addEventListener(
                "click",
                async () => {
                        const confirmed =
                                confirm(
                                        "Archive all completed and cancelled shuttles?"
                                );

                        if (!confirmed) {
                                return;
                        }

                        try {
                                const result =
                                        await archiveCompletedReservations();

                                alert(
                                        `${result.archived_count} shuttle(s) archived.`
                                );

                                await refreshDashboard();
                        } catch (error) {
                                console.error(
                                        "Archive failed:",
                                        error
                                );

                                alert(
                                        "The shuttles could not be archived."
                                );
                        }
                }
        );
		
	const sendCompletionEmailButton =
		document.getElementById(
			"send-completion-email"
		);

	sendCompletionEmailButton.addEventListener(
		"click",
		() => {
			const modal =
				document.getElementById(
					"photo-modal"
				);

			const reservationId =
				Number(
					modal.dataset.reservationId
				);

			const selectedPhotoIds =
				Array.from(
					document.querySelectorAll(
						".completion-photo-checkbox:checked"
					)
				).map(
					(checkbox) =>
						Number(checkbox.value)
				);

			sendCompletionEmailButton.addEventListener(
	"click",
	async () => {
		const modal =
			document.getElementById(
				"photo-modal"
			);

		const selectionStatus =
			document.getElementById(
				"photo-selection-status"
			);

		const reservationId =
			Number(
				modal.dataset.reservationId
			);

		const selectedPhotoIds =
			Array.from(
				document.querySelectorAll(
					".completion-photo-checkbox:checked"
				)
			).map(
				(checkbox) =>
					Number(checkbox.value)
			);

		if (selectedPhotoIds.length === 0) {
			selectionStatus.textContent =
				"Select at least one photo.";
			return;
		}

		sendCompletionEmailButton.disabled = true;
		selectionStatus.textContent =
			"Sending completion email...";

		try {
			const response = await fetch(
				"/api/email/completion",
				{
					method: "POST",
					headers: {
						"Content-Type":
							"application/json",
					},
					body: JSON.stringify({
						reservation_id:
							reservationId,
						photo_ids:
							selectedPhotoIds,
					}),
				}
			);

			const data =
				await response.json();

			if (!response.ok || !data.success) {
				throw new Error(
					data.message ||
					"Completion email failed."
				);
			}

			selectionStatus.textContent =
				"Completion email sent successfully.";

			document
				.querySelectorAll(
					".completion-photo-checkbox"
				)
				.forEach((checkbox) => {
					checkbox.checked = false;
				});

		} catch (error) {
			console.error(
				"Completion email failed:",
				error
			);

			selectionStatus.textContent =
				error.message ||
				"Completion email failed.";

			sendCompletionEmailButton.disabled =
				false;
		}
	}
);
		}
	);

	const photoViewer =
		document.getElementById("photo-viewer");

	const photoViewerClose =
		document.getElementById(
			"photo-viewer-close"
		);
}
