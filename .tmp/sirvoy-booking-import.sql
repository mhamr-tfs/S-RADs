
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
        '30481',
        '2026-08-22',
        '2026-08-23',
        'Expedia',
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
        '30482',
        '2026-08-22',
        '2026-08-23',
        'Expedia',
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
        '30606',
        '2026-08-20',
        '2026-08-21',
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
        '30611',
        '2026-08-25',
        '2026-08-26',
        'Expedia',
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
        '30745',
        '2026-08-18',
        '2026-08-20',
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
        '30746',
        '2026-09-16',
        '2026-09-18',
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
        '30747',
        '2026-09-16',
        '2026-09-18',
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
        '30748',
        '2026-10-14',
        '2026-10-16',
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
        '30749',
        '2026-11-18',
        '2026-11-20',
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
        '30750',
        '2026-12-09',
        '2026-12-11',
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
        '30759',
        '2026-08-16',
        '2026-08-17',
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
        '30777',
        '2026-08-17',
        '2026-08-20',
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
        '30836',
        '2026-11-06',
        '2026-11-08',
        'Expedia',
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
        '30837',
        '2026-11-06',
        '2026-11-08',
        'Expedia',
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
        '30914',
        '2026-09-26',
        '2026-09-27',
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
        '30986',
        '2026-08-19',
        '2026-08-20',
        'Expedia',
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
        '31030',
        '2026-10-16',
        '2026-10-18',
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
        '31035',
        '2026-08-14',
        '2026-08-17',
        'Expedia',
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
        '31045',
        '2026-08-19',
        '2026-08-20',
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
        '31046',
        '2026-08-23',
        '2026-08-24',
        'Expedia',
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
        '31047',
        '2026-08-24',
        '2026-08-25',
        'Expedia',
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
        '31049',
        '2026-08-26',
        '2026-08-27',
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
        '31052',
        '2026-08-16',
        '2026-08-17',
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
        '31078',
        '2027-02-09',
        '2027-02-10',
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
        '31092',
        '2026-08-20',
        '2026-08-21',
        'Expedia',
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
        '31112',
        '2026-08-16',
        '2026-08-17',
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
        '31128',
        '2026-09-26',
        '2026-09-27',
        'Expedia',
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
        '31163',
        '2026-09-09',
        '2026-09-10',
        'Expedia',
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
        '31209',
        '2026-09-15',
        '2026-09-16',
        'Expedia',
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
        '31216',
        '2026-08-21',
        '2026-08-23',
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
        '31240',
        '2026-09-11',
        '2026-09-12',
        'Expedia',
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
        '31241',
        '2026-09-20',
        '2026-09-21',
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
        '31249',
        '2026-08-26',
        '2026-08-27',
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
        '31275',
        '2026-08-20',
        '2026-08-21',
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
        '31276',
        '2026-09-15',
        '2026-09-17',
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
        '31278',
        '2026-08-19',
        '2026-08-20',
        'Expedia',
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
        '31281',
        '2026-08-29',
        '2026-08-30',
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
        '31283',
        '2026-08-30',
        '2026-08-31',
        'Expedia',
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
        '31285',
        '2026-09-19',
        '2026-09-20',
        'Expedia',
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
        '31294',
        '2026-10-14',
        '2026-10-16',
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
        '31307',
        '2026-09-13',
        '2026-09-14',
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
        '31308',
        '2026-09-19',
        '2026-09-20',
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
        '31318',
        '2026-08-20',
        '2026-08-21',
        'Expedia',
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
        '31326',
        '2026-09-10',
        '2026-09-12',
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
        '31327',
        '2026-08-20',
        '2026-08-21',
        'Expedia',
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
        '31328',
        '2026-08-16',
        '2026-08-17',
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
        '31337',
        '2026-09-02',
        '2026-09-03',
        'Expedia',
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
        '31348',
        '2026-09-09',
        '2026-09-10',
        'Expedia',
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
        '31353',
        '2026-08-21',
        '2026-08-22',
        'Expedia',
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
        '31356',
        '2026-08-21',
        '2026-08-22',
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
        '31361',
        '2026-09-12',
        '2026-09-13',
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
        '31362',
        '2026-08-23',
        '2026-08-24',
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
        '31366',
        '2026-08-23',
        '2026-08-25',
        'Expedia',
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
        '31369',
        '2026-09-15',
        '2026-09-16',
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
        '31370',
        '2026-11-06',
        '2026-11-08',
        'Expedia',
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
        '31376',
        '2026-09-18',
        '2026-09-20',
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
        '31377',
        '2026-09-16',
        '2026-09-17',
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
        '31384',
        '2026-09-20',
        '2026-09-21',
        'Expedia',
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
        '31387',
        '2026-09-02',
        '2026-09-06',
        'Expedia',
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
        '31388',
        '2026-08-27',
        '2026-08-30',
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
        '31391',
        '2026-08-24',
        '2026-08-25',
        'Expedia',
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
        '31392',
        '2026-09-09',
        '2026-09-10',
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
        '31406',
        '2026-11-21',
        '2026-11-22',
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
        '31407',
        '2026-09-15',
        '2026-09-16',
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
        '31408',
        '2026-09-26',
        '2026-09-27',
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
        '31409',
        '2026-08-22',
        '2026-08-23',
        'Expedia',
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
        '31410',
        '2026-08-22',
        '2026-08-23',
        'Expedia',
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
        '31417',
        '2026-08-19',
        '2026-08-20',
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
        '31421',
        '2026-08-16',
        '2026-08-17',
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
        '31423',
        '2026-08-18',
        '2026-08-20',
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
        '31424',
        '2026-08-17',
        '2026-08-18',
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
        '31428',
        '2026-08-21',
        '2026-08-22',
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
        '31429',
        '2027-07-27',
        '2027-07-28',
        'Expedia',
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
        '31430',
        '2026-08-18',
        '2026-08-19',
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
        '31431',
        '2026-08-21',
        '2026-08-23',
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
        '31432',
        '2026-08-21',
        '2026-08-23',
        'Expedia',
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
        '31433',
        '2026-08-17',
        '2026-08-18',
        'Expedia',
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
        '31434',
        '2026-08-18',
        '2026-08-19',
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
        '31436',
        '2026-08-20',
        '2026-08-21',
        'Expedia',
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
        '31437',
        '2026-08-17',
        '2026-08-18',
        'Expedia',
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
        '31438',
        '2026-08-17',
        '2026-08-18',
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
        '31439',
        '2026-08-17',
        '2026-08-18',
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
