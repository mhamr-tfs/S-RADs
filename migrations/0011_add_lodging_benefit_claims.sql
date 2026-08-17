CREATE TABLE lodging_benefit_claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    provider TEXT NOT NULL,
    external_booking_id TEXT NOT NULL,

    reservation_id INTEGER,

    benefit_date TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'claimed',

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    released_at TEXT,

    FOREIGN KEY (reservation_id)
        REFERENCES reservations(id)
);

CREATE INDEX idx_lodging_claims_booking
ON lodging_benefit_claims (
    provider,
    external_booking_id
);

CREATE INDEX idx_lodging_claims_date
ON lodging_benefit_claims (
    provider,
    external_booking_id,
    benefit_date
);

CREATE UNIQUE INDEX idx_lodging_active_claim
ON lodging_benefit_claims (
    provider,
    external_booking_id,
    benefit_date
)
WHERE status = 'claimed';