/* S-RADs Payment Report
 *
 * This module initializes the payment report page by fetching payment summaries and rendering them.
 * It uses the payment API to retrieve data and the payment renderer to display it in the frontend.
 */
import {
	getPaymentSummary,
	getOutstandingPayments,
} from "./payment-api.js";

import {
	renderPaymentSummary,
	renderOutstandingPayments,
} from "./payment-render.js";

import { 
	loadAppVersion 
} from "./app-version.js";

async function initializePaymentReport() {
	try {
		const summary = await getPaymentSummary();

renderPaymentSummary(summary);

const outstanding = await getOutstandingPayments();

renderOutstandingPayments(outstanding);

// Leave this commented out until the renderer exists.
// renderOutstandingPayments(outstanding);

		// Outstanding payments will be rendered next.
		// const outstanding = await getOutstandingPayments();

	} catch (error) {
		console.error("Payment report failed to load:", error);

		alert("Unable to load payment report.");
	}
}

loadAppVersion();
initializePaymentReport();