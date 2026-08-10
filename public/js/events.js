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

export function attachFilterListeners() {
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

			console.log(
				"Completion email reservation:",
				reservationId
			);

			console.log(
				"Selected completion photos:",
				selectedPhotoIds
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