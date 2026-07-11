-- Migration number: 0003 	 2026-07-10T05:43:24.945Z
CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    active TEXT DEFAULT 'Yes'
);

DELETE FROM drivers;

INSERT INTO drivers (name, phone) VALUES
('Mike', ''),
('Employee 2', ''),
('Employee 3', '');