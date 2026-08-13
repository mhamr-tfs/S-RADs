-- Migration number: 0007
-- Add reversible reservation archiving

ALTER TABLE reservations
ADD COLUMN archived INTEGER NOT NULL DEFAULT 0;

ALTER TABLE reservations
ADD COLUMN archived_at TEXT;
