// ======================================================
// Reservation Service
// ======================================================


// ======================================================
// Get reservations
// ======================================================
export async function getReservations(env) {
	const result = await env.DB.prepare(
		"SELECT * FROM reservations WHERE archived = 0 ORDER BY shuttle_date, expected_takeout_time"
	).all();

	return result.results;
}
// ======================================================
// Create reservation
// ======================================================
export async function createReservation(
	env,
	reservation
) {
	const paymentStatus =
		reservation.is_two_rivers_guest === "Yes" &&
		reservation.two_rivers_direct_booking === "Yes"
			? "Included"
			: "Pending";

	const paymentReason =
		paymentStatus === "Included"
			? "Two Rivers Inn direct booking"
			: null;

	const result = await env.DB.prepare(`
		INSERT INTO reservations (
			first_name,
			last_name,
			phone,
			email,
			shuttle_date,
			expected_takeout_time,
			launch_site,
			takeout_site,
			vehicle_year,
			vehicle_make,
			vehicle_model,
			vehicle_color,
			license_plate,
			license_state,
			license_county,
			key_location,
			key_location_other,
			special_instructions,
			is_two_rivers_guest,
			two_rivers_direct_booking,
			is_guide,
			price,
			payment_method,
			payment_status,
			payment_reason,
			cash_location
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`)
		.bind(
			reservation.first_name,
			reservation.last_name,
			reservation.phone,
			reservation.email,
			reservation.shuttle_date,
			reservation.expected_takeout_time,
			reservation.launch_site,
			reservation.takeout_site,
			reservation.vehicle_year,
			reservation.vehicle_make,
			reservation.vehicle_model,
			reservation.vehicle_color,
			reservation.license_plate,
			reservation.license_state,
			reservation.license_county,
			reservation.key_location,
			reservation.key_location_other,
			reservation.special_instructions,
			reservation.is_two_rivers_guest || "No",
			reservation.two_rivers_direct_booking || "No",
			reservation.is_guide || "No",
			Number(reservation.price || 0),
			reservation.payment_method,
			paymentStatus,
			paymentReason,
			reservation.cash_location
		)
		.run();

	return {
		reservationId:
			result.meta.last_row_id,
		paymentStatus,
	};
}
// ======================================================
// Update reservation
// ======================================================
export async function updateReservation(
	env,
	update
) {
	const now = new Date().toISOString();

	const driver = update.driver ?? null;
	const status = update.status ?? null;
	const paymentStatus =
		update.payment_status ?? null;

	const startedAt =
		status === "In Progress"
			? now
			: null;

	const completedAt =
		status === "Completed"
			? now
			: null;

	const paidAt =
		paymentStatus === "Paid"
			? now
			: null;

	await env.DB.prepare(`
		UPDATE reservations
		SET
			driver = COALESCE(?, driver),
			status = COALESCE(?, status),

			started_at =
				CASE
					WHEN ? = 'In Progress'
					THEN COALESCE(started_at, ?)
					ELSE started_at
				END,

			completed_at =
				CASE
					WHEN ? = 'Completed'
					THEN COALESCE(completed_at, ?)
					ELSE completed_at
				END,

			payment_status =
				COALESCE(?, payment_status),

			paid_at =
				CASE
					WHEN ? = 'Paid'
					THEN COALESCE(paid_at, ?)
					ELSE paid_at
				END

		WHERE id = ?
	`)
		.bind(
			driver,
			status,
			status,
			startedAt,
			status,
			completedAt,
			paymentStatus,
			paymentStatus,
			paidAt,
			update.id
		)
		.run();

	return {
		success: true,
		message: "Reservation updated",
	};
	
}
// ======================================================
// Archive reservation
// ======================================================
export async function archiveReservation(
        env,
        reservationId
) {
        const now = new Date().toISOString();

        const result = await env.DB.prepare(`
                UPDATE reservations
                SET archived = 1,
                    archived_at = ?
                WHERE id = ?
        `)
                .bind(
                        now,
                        reservationId
                )
                .run();

        return {
                success: true,
                archived: true,
                reservation_id: reservationId,
                changes: result.meta.changes,
        };
}

// ======================================================
// Restore archived reservation
// ======================================================
export async function restoreReservation(
        env,
        reservationId
) {
        const result = await env.DB.prepare(`
                UPDATE reservations
                SET archived = 0,
                    archived_at = NULL
                WHERE id = ?
        `)
                .bind(
                        reservationId
                )
                .run();

        return {
                success: true,
                archived: false,
                reservation_id: reservationId,
                changes: result.meta.changes,
        };
}
// ======================================================
// Get archived reservations
// ======================================================
export async function getArchivedReservations(env) {
        const result = await env.DB.prepare(`
                SELECT *
                FROM reservations
                WHERE archived = 1
                ORDER BY archived_at DESC
        `).all();

        return result.results;
}
// ======================================================
// Archive all completed and cancelled reservations
// ======================================================
export async function archiveCompletedReservations(env) {
        const now = new Date().toISOString();

        const result = await env.DB.prepare(`
                UPDATE reservations
                SET archived = 1,
                    archived_at = ?
                WHERE archived = 0
                  AND status IN ('Completed', 'Cancelled')
        `)
                .bind(now)
                .run();

        return {
                success: true,
                archived_count: result.meta.changes,
        };
}