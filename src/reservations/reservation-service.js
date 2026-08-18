import {
        validateLodgingBenefit
} from "../benefits/lodging-benefit-service.js";

import {
        checkLodgingBenefitAvailability,
        claimLodgingBenefit
} from "../benefits/lodging-claim-service.js";

import {
        createSirvoyBenefitProvider
} from "../integrations/sirvoy/sirvoy-benefit-provider.js";

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
        let paymentStatus =
                "Pending";

        let paymentReason =
                null;

        let directBooking =
                "No";

        let benefitDate =
                null;

        let lodgingBenefitApproved =
                false;

        const isTwoRiversGuest =
                reservation.is_two_rivers_guest ===
                "Yes";

        const bookingId =
                String(
                        reservation.sirvoy_booking_number ??
                                ""
                ).trim();

        /*
         * Never trust the browser's
         * two_rivers_direct_booking value.
         *
         * If the customer claims the motel
         * benefit, validate it again here.
         */
        if (
                isTwoRiversGuest &&
                bookingId
        ) {
                const provider =
                        createSirvoyBenefitProvider(
                                env
                        );

                const validation =
                        await validateLodgingBenefit(
                                provider,
                                {
                                        bookingId,
                                        shuttleDate:
                                                reservation.shuttle_date,
                                }
                        );

                if (
                        validation.valid &&
                        validation.eligible
                ) {
                        directBooking =
                                "Yes";

                        const availability =
                                await checkLodgingBenefitAvailability(
                                        env,
                                        {
                                                provider:
                                                        "sirvoy",

                                                externalBookingId:
                                                        bookingId,

                                                shuttleDate:
                                                        reservation.shuttle_date,

                                                arrivalDate:
                                                        validation.arrivalDate,

                                                departureDate:
                                                        validation.departureDate,
                                        }
                                );

                        if (
                                availability.available
                        ) {
                                benefitDate =
                                        availability.benefitDate;

                                lodgingBenefitApproved =
                                        true;
                        }
                }
        }

        /*
         * Create the reservation as Pending first.
         *
         * Only after we successfully claim the
         * lodging entitlement do we change the
         * reservation to Included.
         *
         * This protects us if two requests try
         * to claim the same benefit simultaneously.
         */
        const result =
                await env.DB.prepare(`
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
                        VALUES (
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?
                        )
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
                                reservation.is_two_rivers_guest ||
                                        "No",
                                directBooking,
                                reservation.is_guide ||
                                        "No",
                                Number(
                                        reservation.price ||
                                                0
                                ),
                                reservation.payment_method,
                                paymentStatus,
                                paymentReason,
                                reservation.cash_location
                        )
                        .run();

        const reservationId =
                result.meta.last_row_id;

        /*
         * Attempt the actual benefit claim.
         *
         * The unique D1 index is the final
         * protection against duplicate claims.
         */
        if (
                lodgingBenefitApproved &&
                benefitDate
        ) {
                const claim =
                        await claimLodgingBenefit(
                                env,
                                {
                                        provider:
                                                "sirvoy",

                                        externalBookingId:
                                                bookingId,

                                        reservationId,
                                        benefitDate,
                                }
                        );

                if (claim.success) {
                        paymentStatus =
                                "Included";

                        paymentReason =
                                "Two Rivers Inn verified direct booking";

                        await env.DB.prepare(`
                                UPDATE reservations
                                SET
                                        payment_status = ?,
                                        payment_reason = ?,
                                        two_rivers_direct_booking = 'Yes'
                                WHERE id = ?
                        `)
                                .bind(
                                        paymentStatus,
                                        paymentReason,
                                        reservationId
                                )
                                .run();
                }
        }

        return {
                reservationId,
                paymentStatus,
                lodgingBenefitApplied:
                        paymentStatus ===
                        "Included",
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
// ======================================================
// Staff edit reservation details
// ======================================================
export async function editReservationDetails(
        env,
        update
) {
                const criticalFields = new Set([
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
        ]);
        const editableFields = [
                "first_name",
                "last_name",
                "phone",
                "email",
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
                "special_instructions",
                "is_two_rivers_guest",
                "two_rivers_direct_booking",
                "payment_method",
                "cash_location",
        ];

        const reservationId =
                Number(update.id);

        const current =
                await env.DB.prepare(
                        "SELECT * FROM reservations WHERE id = ?"
                )
                        .bind(reservationId)
                        .first();

        if (!current) {
                return {
                        success: false,
                        message: "Reservation not found",
                };
        }

        const changes = [];

        for (const field of editableFields) {
                if (!(field in update)) {
                        continue;
                }

                const oldValue =
                        current[field] ?? null;

                const newValue =
                        update[field] ?? null;

                if (
                        String(oldValue ?? "") ===
                        String(newValue ?? "")
                ) {
                        continue;
                }

                changes.push({
                        field,
                        oldValue,
                        newValue,
                });
        }

        if (changes.length === 0) {
                return {
                        success: true,
                        message: "No changes detected",
                        changes: 0,
                };
        }

        for (const change of changes) {
        await env.DB.prepare(`
                INSERT INTO reservation_changes (
                        reservation_id,
                        field_name,
                        old_value,
                        new_value,
                        changed_by,
                        is_critical
                )
                VALUES (?, ?, ?, ?, ?, ?)
        `)
                .bind(
                        reservationId,
                        change.field,
                        change.oldValue,
                        change.newValue,
                        update.changed_by ?? null,
                        criticalFields.has(change.field) ? 1 : 0
                )
                .run();
}

        const assignments =
                changes
                        .map(
                                (change) =>
                                        `${change.field} = ?`
                        )
                        .join(", ");

        const values =
                changes.map(
                        (change) =>
                                change.newValue
                );

        await env.DB.prepare(`
                UPDATE reservations
                SET ${assignments}
                WHERE id = ?
        `)
                .bind(
                        ...values,
                        reservationId
                )
                .run();

                return {
                success: true,
                message: "Reservation details updated",
                changes: changes.length,
        };
}
// ======================================================
// Get unacknowledged critical changes
// ======================================================
export async function getCriticalChanges(env) {
        const result = await env.DB.prepare(`
                SELECT
                        id,
                        reservation_id,
                        field_name,
                        old_value,
                        new_value,
                        changed_at,
                        changed_by
                FROM reservation_changes
                WHERE is_critical = 1
                  AND acknowledged_at IS NULL
                ORDER BY changed_at DESC
        `).all();

        return result.results;
}
// ======================================================
// Acknowledge critical changes for a reservation
// ======================================================
export async function acknowledgeCriticalChanges(
        env,
        reservationId,
        acknowledgedBy
) {
        const now = new Date().toISOString();

        const result = await env.DB.prepare(`
                UPDATE reservation_changes
                SET acknowledged_at = ?,
                    acknowledged_by = ?
                WHERE reservation_id = ?
                  AND is_critical = 1
                  AND acknowledged_at IS NULL
        `)
                .bind(
                        now,
                        acknowledgedBy ?? "Staff",
                        reservationId
                )
                .run();

        return {
                success: true,
                acknowledged_count: result.meta.changes,
        };
}
