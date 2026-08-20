DROP INDEX IF EXISTS idx_lodging_active_claim;

CREATE INDEX idx_lodging_claim_lookup
ON lodging_benefit_claims (
    provider,
    external_booking_id,
    benefit_date,
    status
);