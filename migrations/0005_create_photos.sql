CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    reservation_id INTEGER NOT NULL,

    photo_type TEXT DEFAULT 'vehicle',

    uploaded_by TEXT,
    file_name TEXT NOT NULL,
    storage_key TEXT NOT NULL UNIQUE,
    content_type TEXT,

    uploaded_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (reservation_id)
        REFERENCES reservations(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_photos_reservation_id
ON photos (reservation_id);