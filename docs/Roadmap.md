# S-RADs Development Roadmap

## Current Version

**0.4.0-beta — Limited Operational Release**

S-RADs has completed the primary alpha development cycle.
The beta cycle focuses on real-world shuttle operations, validation,
hardening, and production readiness.

---

## Phase 1 - Customer Reservations ✅

- [x] Customer reservation form
- [x] Route pricing
- [x] Vehicle information
- [x] Two Rivers logic

## Phase 2 - Dispatch ✅

- [x] Driver assignment
- [x] Shuttle status
- [x] Elapsed timer
- [x] Payment management
- [x] Timestamp tracking

---

## Phase 3 - Operations ✅

### Core Operations

- [x] Search reservations
- [x] Driver availability panel
- [x] Dashboard metrics
- [x] Dev-tools
- [x] Payment reporting — 0.3.5-alpha
- [x] Photo upload / Cloudflare R2 — 0.3.6-alpha
- [x] Square integration — 0.3.7-alpha
- [x] Email confirmations — 0.3.8-alpha
- [x] Subsystem refactor — 0.3.9-alpha
- [x] Alpha feature-complete milestone — 0.3.10-alpha

---

## Phase 4 - Operational Beta and Benefits and External Booking Validation

### 0.4.0-beta — Limited Operational Release

- [x] Square production cutover and validation
- [x] Added staff edit functionality into the dashboard
- [ ] First live customer shuttle
- [ ] Validate customer reservation workflow under real conditions
- [ ] Validate live payment workflow
- [ ] Validate dispatch workflow
- [ ] Validate photo documentation workflow
- [ ] Validate completion email workflow
- [ ] Confirm operational fallback procedure
- [ ] Production dashboard access

### Beta Enhancements

- [x] Archive completed shuttles — 0.4.1-beta
- [ ] Cancelled reservation workflow — 0.4.2-beta
- [x] Better dashboard filtering — 0.4.3-beta
- [x] CSV/Excel export — 0.4.4-beta
- [ ] Driver mobile capture — 0.4.5-beta

### Sirvoy Integration

- [x] Create Sirvoy booking cache in D1
- [x] Create Sirvoy booking-event webhook endpoint
- [x] Validate webhook behavior using real Two Rivers bookings
- [x] Seed current/future bookings from Sirvoy-compatible export
- [x] Track booking source
- [x] Handle booking creation, modification, cancellation, and restoration
- [x] Prevent older webhook events from overwriting newer booking data

### Two Rivers Guest Verification

- [x] Replace customer "Booked directly" checkbox with Sirvoy booking number
- [x] Validate Sirvoy booking number automatically
- [x] Determine direct-booking eligibility automatically
- [x] Eligible direct sources:
    - Website
    - Front desk
- [x] OTA/channel bookings do not qualify for complimentary shuttle
- [x] Do not require guest-name match
- [x] Do not require customer Sirvoy login

Note: Sirvoy determines booking validity and eligibility. S-RADs determines benefit entitlement and tracks benefit consumption.
### Two Rivers Complimentary Shuttle Rules

Current policy:

- One complimentary shuttle per night of stay
- Complimentary shuttles do not bank/roll over
- Check-in day may qualify
- Checkout day may qualify
- Checkout-day use does not create an additional entitlement
- Shuttle must be associated with a valid active direct booking
- S-RADs tracks benefit usage independently from Sirvoy

Implementation:

- [x] Create motel benefit/claim ledger
- [x] Prevent duplicate use of the same nightly entitlement
- [x] Release entitlement when qualifying shuttle is cancelled
- [x] Preserve audit history of benefit use
- [x] Full customer reservation integration

### Customer Loyalty Program

Current policy:

- Buy 9 qualifying paid shuttles
- 10th shuttle is complimentary

Implementation:

- [ ] Create customer loyalty tracking
- [ ] Determine customer identity/matching strategy
- [ ] Track qualifying paid shuttle events
- [ ] Track earned/redeemed complimentary shuttles
- [ ] Handle cancellations/refunds correctly
- [ ] Motel-included shuttles do not count as paid loyalty shuttles
- [ ] Preserve loyalty audit history

### Business Rules / Admin Configuration

Build policy rules so they are configurable rather than hard-coded.

- [ ] Benefits administration page
- [ ] Enable/disable Two Rivers benefit
- [ ] Configure complimentary shuttles per night
- [ ] Configure check-in-day eligibility
- [ ] Configure checkout-day eligibility
- [ ] Configure rollover/banking behavior
- [ ] Configure eligible Sirvoy booking sources
- [ ] Enable/disable loyalty program
- [ ] Configure number of paid shuttles required for reward
- [ ] Configure reward amount/type
- [ ] Configure which reservation/payment types count toward loyalty

---

## Version Status

| Version | Status | Milestone |
|---|---|---|
| 0.1.x | ✅ Complete | Foundation |
| 0.2.x | ✅ Complete | Reservation System |
| 0.3.0-alpha | ✅ Complete | Dispatch Dashboard |
| 0.3.1–0.3.10-alpha | ✅ Complete | Operations & Integration |
| 0.4.0-beta | 🚧 Current | Limited Operational Release |
| 0.4.x-beta | ⏳ Planned | Validation & Hardening |
| 1.0.0 | 🎯 Goal | Production Release |

---

## Post-1.0 Enhancements

### Smart Dispatch Alerts

- Route-aware timing
- Dispatch deadline calculation
- Push notifications
- Audible office alerts
- Driver availability awareness

### Enhanced Photo Documentation

- Vehicle verification
- Key location
- Pickup
- Drop-off
- Damage documentation

### Mobile Driver App

### Reporting & Analytics

### Twilio Integration