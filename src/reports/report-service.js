// ======================================================
// Payment Reports Service
// ======================================================


// ======================================================
// Payment summary
// ======================================================
export async function getPaymentSummary(env) {
	const summary = await env.DB.prepare(`
		SELECT
			COUNT(*) AS reservation_count,

			COALESCE(
				SUM(
					CASE
						WHEN payment_status = 'Paid'
						THEN price
						ELSE 0
					END
				),
				0
			) AS collected_revenue,

			COALESCE(
				SUM(
					CASE
						WHEN payment_status = 'Pending'
							AND status != 'Cancelled'
						THEN price
						ELSE 0
					END
				),
				0
			) AS outstanding_revenue,

			COALESCE(
				SUM(
					CASE
						WHEN payment_status = 'Included'
						THEN price
						ELSE 0
					END
				),
				0
			) AS included_value,

			COALESCE(
				SUM(
					CASE
						WHEN payment_status = 'Waived'
						THEN price
						ELSE 0
					END
				),
				0
			) AS waived_value,

			COALESCE(
				SUM(
					CASE
						WHEN payment_status = 'Refunded'
						THEN price
						ELSE 0
					END
				),
				0
			) AS refunded_value,

			SUM(
				CASE
					WHEN payment_status = 'Paid'
					THEN 1
					ELSE 0
				END
			) AS paid_count,

			SUM(
				CASE
					WHEN payment_status = 'Pending'
						AND status != 'Cancelled'
					THEN 1
					ELSE 0
				END
			) AS pending_count

		FROM reservations
	`).first();

	return {
		success: true,
		summary,
	};
}


// ======================================================
// Outstanding payments
// ======================================================
export async function getOutstandingPayments(env) {
	const reservations = await env.DB.prepare(`
		SELECT
			id,
			first_name,
			last_name,
			shuttle_date,
			price,
			payment_status

		FROM reservations

		WHERE payment_status = 'Pending'
			AND status != 'Cancelled'

		ORDER BY shuttle_date ASC
	`).all();

	return {
		success: true,
		reservations: reservations.results,
	};
}