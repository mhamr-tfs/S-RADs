export async function upsertSirvoyBooking(
        env,
        booking
) {
        const bookingId =
                String(
                        booking.bookingId ?? ""
                ).trim();

        if (!bookingId) {
                return {
                        success: false,
                        message: "Missing Sirvoy booking ID",
                };
        }

        const incomingGeneratedAt =
                booking.generatedAt ?? null;

        const existing =
                await env.DB.prepare(`
                        SELECT
                                booking_id,
                                generated_at
                        FROM sirvoy_bookings
                        WHERE booking_id = ?
                `)
                        .bind(
                                bookingId
                        )
                        .first();

        if (
                existing?.generated_at &&
                incomingGeneratedAt &&
                new Date(
                        incomingGeneratedAt
                ).getTime() <=
                new Date(
                        existing.generated_at
                ).getTime()
        ) {
                return {
                        success: true,
                        ignored: true,
                        message:
                                "Older Sirvoy event ignored",
                };
        }

        const now =
                new Date().toISOString();

        await env.DB.prepare(`
                INSERT INTO sirvoy_bookings (
                        booking_id,
                        arrival_date,
                        departure_date,
                        booking_source,
                        channel_booking_id,
                        cancelled,
                        confirmed,
                        generated_at,
                        updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

                ON CONFLICT(booking_id)
                DO UPDATE SET
                        arrival_date =
                                excluded.arrival_date,

                        departure_date =
                                excluded.departure_date,

                        booking_source =
                                excluded.booking_source,

                        channel_booking_id =
                                excluded.channel_booking_id,

                        cancelled =
                                excluded.cancelled,

                        confirmed =
                                excluded.confirmed,

                        generated_at =
                                excluded.generated_at,

                        updated_at =
                                excluded.updated_at
        `)
                .bind(
                        bookingId,
                        booking.arrivalDate ?? null,
                        booking.departureDate ?? null,
                        booking.bookingSource ?? null,
                        booking.channelBookingId ?? null,
                        booking.cancelled ? 1 : 0,
                        booking.bookingIsConfirmed ? 1 : 0,
                        incomingGeneratedAt,
                        now
                )
                .run();

        return {
                success: true,
                ignored: false,
                booking_id: bookingId,
        };
}