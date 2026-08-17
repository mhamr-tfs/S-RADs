CREATE TABLE sirvoy_bookings (
    booking_id TEXT PRIMARY KEY,
    arrival_date TEXT,
    departure_date TEXT,
    booking_source TEXT,
    channel_booking_id TEXT,
    cancelled INTEGER NOT NULL DEFAULT 0,
    confirmed INTEGER NOT NULL DEFAULT 0,
    generated_at TEXT,
    updated_at TEXT NOT NULL
);

CREATE INDEX idx_sirvoy_bookings_dates
ON sirvoy_bookings (
    arrival_date,
    departure_date
);

CREATE INDEX idx_sirvoy_bookings_source
ON sirvoy_bookings (
    booking_source
);