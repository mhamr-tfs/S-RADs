import { 
		state 
	} from "./state.js";
import {
        fetchReservations,
        fetchDrivers,
        fetchCriticalChanges
	} from "./api.js";
import { 
		renderSummary, 
		renderDriverAvailability, 
		renderReservations, 
		renderDashboardError 
	} from "./render.js";
import {
		 attachFilterListeners, 
		 configureEventCallbacks 
		} from "./events.js";
import { 
	loadAppVersion 
     } from "./app-version.js";


export async function loadDashboard() {
        try {
                const [
                        reservations,
                        drivers,
                        criticalChanges
                ] = await Promise.all([
                        fetchReservations(),
                        fetchDrivers(),
                        fetchCriticalChanges(),
                ]);

                state.reservations = reservations;
                state.drivers = drivers;
                state.criticalChanges = criticalChanges;

                renderSummary(reservations);
                renderDriverAvailability(reservations);
                renderReservations();
        } catch (error) {
                console.error(
                        "Dashboard loading failed:",
                        error
                );

                renderDashboardError(
                        "The dashboard could not load. Check the browser console and Wrangler terminal."
                );
        }
}

configureEventCallbacks({
	onRefreshDashboard: loadDashboard,
	onRenderReservations: renderReservations,
});

attachFilterListeners();
loadAppVersion();
loadDashboard();
setInterval(loadDashboard, 30000);
