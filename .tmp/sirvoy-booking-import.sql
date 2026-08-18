BEGIN TRANSACTION;

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
VALUES (
        'TEST-3001',
        '2026-09-01',
        '2026-09-03',
        'Front desk',
        NULL,
        0,
        1,
        NULL,
        CURRENT_TIMESTAMP
)

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

        updated_at =
                excluded.updated_at

WHERE
        sirvoy_bookings.generated_at
                IS NULL;


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
VALUES (
        'TEST-3002',
        '2026-09-05',
        '2026-09-07',
        'Website',
        NULL,
        0,
        1,
        NULL,
        CURRENT_TIMESTAMP
)

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

        updated_at =
                excluded.updated_at

WHERE
        sirvoy_bookings.generated_at
                IS NULL;


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
VALUES (
        'TEST-3003',
        '2026-09-10',
        '2026-09-11',
        'Booking.com',
        NULL,
        0,
        1,
        NULL,
        CURRENT_TIMESTAMP
)

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

        updated_at =
                excluded.updated_at

WHERE
        sirvoy_bookings.generated_at
                IS NULL;


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
VALUES (
        'TEST-3004',
        '2026-09-12',
        '2026-09-14',
        'Expedia',
        NULL,
        0,
        0,
        NULL,
        CURRENT_TIMESTAMP
)

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

        updated_at =
                excluded.updated_at

WHERE
        sirvoy_bookings.generated_at
                IS NULL;

COMMIT;