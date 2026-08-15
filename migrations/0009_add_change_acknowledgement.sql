-- Migration number: 0009
-- Add critical-change acknowledgement tracking

ALTER TABLE reservation_changes
ADD COLUMN is_critical INTEGER NOT NULL DEFAULT 0;

ALTER TABLE reservation_changes
ADD COLUMN acknowledged_at TEXT;

ALTER TABLE reservation_changes
ADD COLUMN acknowledged_by TEXT;
