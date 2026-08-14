-- Migration number: 0008
-- Reservation staff edit history

CREATE TABLE IF NOT EXISTS reservation_changes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reservation_id INTEGER NOT NULL,
        field_name TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        changed_at TEXT DEFAULT CURRENT_TIMESTAMP,
        changed_by TEXT,

        FOREIGN KEY (reservation_id)
                REFERENCES reservations(id)
);
