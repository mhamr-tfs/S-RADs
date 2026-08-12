export async function loadAppVersion() {
	try {
		const response = await fetch("/api/status");
		const data = await response.json();

		if (!response.ok) {
			throw new Error("Unable to load app version.");
		}

		document
			.querySelectorAll("[data-app-version]")
			.forEach((element) => {
				element.textContent = data.version;
			});
	} catch (error) {
		console.error(
			"Version load failed:",
			error
		);

		document
			.querySelectorAll("[data-app-version]")
			.forEach((element) => {
				element.textContent = "Unknown";
			});
	}
}