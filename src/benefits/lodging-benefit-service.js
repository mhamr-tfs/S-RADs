export async function validateLodgingBenefit(
        provider,
        {
                bookingId,
                shuttleDate,
        }
) {
        if (!provider) {
                return {
                        valid: false,
                        eligible: false,
                        reason:
                                "lodging_integration_unavailable",
                };
        }

        if (!bookingId) {
                return {
                        valid: false,
                        eligible: false,
                        reason:
                                "missing_booking_id",
                };
        }

        if (!shuttleDate) {
                return {
                        valid: false,
                        eligible: false,
                        reason:
                                "missing_shuttle_date",
                };
        }

        return provider.validateBooking({
                bookingId:
                        String(
                                bookingId
                        ).trim(),
                shuttleDate,
        });
}