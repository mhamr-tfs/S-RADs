import { state } from "./state.js";
import { fetchReservations, fetchDrivers } from "./api.js";
import { renderSummary, renderDriverAvailability, renderReservations, renderDashboardError } from "./render.js";
import { attachFilterListeners, configureEventCallbacks } from "./events.js";

export async function loadDashboard() {
	try {
		const [reservations, drivers] = await Promise.all([
			fetchReservations(),
			fetchDrivers(),
		]);

		state.reservations = reservations;
		state.drivers = drivers;
		renderSummary(reservations);
		renderDriverAvailability(reservations);
		renderReservations();
	} catch (error) {
		console.error("Dashboard loading failed:", error);
		renderDashboardError("The dashboard could not load. Check the browser console and Wrangler terminal.");
	}
}

configureEventCallbacks({
	onRefreshDashboard: loadDashboard,
	onRenderReservations: renderReservations,
});

attachFilterListeners();
loadDashboard();
setInterval(loadDashboard, 30000);
