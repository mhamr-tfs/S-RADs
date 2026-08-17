const DIRECT_BOOKING_SOURCES =
        new Set([
                "Website",
                "Front desk",
        ]);

export function createSirvoyBenefitProvider(
        env
) {
        return {
                async validateBooking({
                        bookingId,
                        shuttleDate,
                }) {
                        const booking =
                                await env.DB.prepare(`
                                        SELECT
                                                booking_id,
                                                arrival_date,
                                                departure_date,
                                                booking_source,
                                                cancelled,
                                                confirmed
                                        FROM sirvoy_bookings
                                        WHERE booking_id = ?
                                `)
                                        .bind(
                                                bookingId
                                        )
                                        .first();

                        if (!booking) {
                                return {
                                        valid: false,
                                        eligible: false,
                                        reason:
                                                "booking_not_found",
                                };
                        }

                        if (booking.cancelled) {
                                return {
                                        valid: true,
                                        eligible: false,
                                        reason:
                                                "booking_cancelled",
                                };
                        }

                        if (!booking.confirmed) {
                                return {
                                        valid: true,
                                        eligible: false,
                                        reason:
                                                "booking_not_confirmed",
                                };
                        }

                        if (
                                shuttleDate <
                                        booking.arrival_date ||
                                shuttleDate >
                                        booking.departure_date
                        ) {
                                return {
                                        valid: true,
                                        eligible: false,
                                        reason:
                                                "outside_stay_dates",
                                };
                        }

                        const direct =
                                DIRECT_BOOKING_SOURCES.has(
                                        booking.booking_source
                                );

                        if (!direct) {
                                return {
                                        valid: true,
                                        eligible: false,
                                        reason:
                                                "not_direct_booking",
                                        arrivalDate:
                                                booking.arrival_date,
                                        departureDate:
                                                booking.departure_date,
                                };
                        }

                        return {
                                valid: true,
                                eligible: true,
                                reason:
                                        "eligible_direct_booking",
                                arrivalDate:
                                        booking.arrival_date,
                                departureDate:
                                        booking.departure_date,
                        };
                },
        };
}