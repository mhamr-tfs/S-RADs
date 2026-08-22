# S-RADs Development Roadmap

## Current Version

**0.4.0-beta — Productization & Operational Beta**

S-RADs has completed the primary alpha development cycle.

The beta cycle now focuses on:

- real-world operational validation
- product hardening
- configurable business administration
- external integrations
- customer loyalty / benefit systems
- preparation for commercial deployment

---

## Phase 1 - Customer Reservations ✅

- [x] Customer reservation form
- [x] Route pricing
- [x] Vehicle information
- [x] Lodging-benefit support

---

## Phase 2 - Dispatch ✅

- [x] Driver assignment
- [x] Shuttle status
- [x] Elapsed timer
- [x] Payment management
- [x] Timestamp tracking

---

## Phase 3 - Core Operations ✅

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

## Phase 4 - Operational Beta

### 0.4.0-beta — Limited Operational Release

- [x] Square production cutover and validation
- [x] Staff reservation editing
- [ ] First live customer shuttle under independent deployment
- [ ] Validate customer reservation workflow under real conditions
- [ ] Validate live payment workflow
- [ ] Validate dispatch workflow
- [ ] Validate photo documentation workflow
- [ ] Validate completion email workflow
- [ ] Confirm operational fallback procedure
- [ ] Production dashboard access

-[ ] Production end-to-end acceptance test
-[ ] Validate customer reservation workflow
-[ ] Validate live payment workflow
-[ ] Validate dispatch workflow
-[ ] Validate photo documentation workflow
-[ ] Validate completion email workflow
### Beta Enhancements

- [x] Archive completed shuttles — 0.4.1-beta
- [ ] Cancelled reservation workflow — 0.4.2-beta
- [x] Better dashboard filtering — 0.4.3-beta
- [x] CSV / Excel export — 0.4.4-beta
- [ ] Driver mobile capture — 0.4.5-beta

---

## Phase 5 - Benefits & External Booking Validation

### Lodging Integration Framework

- [x] Create external lodging booking cache in D1
- [x] Create booking-event webhook endpoint
- [x] Validate webhook behavior using real booking data
- [x] Seed current/future bookings from compatible export
- [x] Track booking source
- [x] Handle booking creation, modification, cancellation, and restoration
- [x] Prevent older webhook events from overwriting newer booking data
- [x] Isolate provider-specific code under integration modules

### Sirvoy Integration

- [x] Sirvoy booking-event webhook
- [x] Sirvoy booking cache synchronization
- [x] Sirvoy-compatible CSV bootstrap importer
- [x] Direct-vs-OTA booking source detection
- [x] Customer booking-number validation
- [x] Full customer reservation integration

### Lodging Benefit Engine

- [x] Create lodging benefit/claim ledger
- [x] Preserve benefit audit history
- [x] Release entitlement when qualifying shuttle is cancelled
- [x] Configurable complimentary shuttles per night
- [x] Configurable check-in-day eligibility
- [x] Configurable checkout-day eligibility
- [x] Configurable rollover/banking
- [x] Support multiple active benefits per eligible night
- [x] Prevent benefit over-allocation
- [x] Backend authoritative eligibility validation

---

## Phase 6 - Business Administration & Product Configuration

### Business Identity / Branding

Separate S-RADs product identity from customer deployment identity.

- [ ] Keep product/version metadata in `app-version.js`
- [ ] Store business identity/configuration in D1
- [ ] Business name
- [ ] Display/trading name
- [ ] Business logo
- [ ] Phone
- [ ] Email
- [ ] Website
- [ ] Address
- [ ] Time zone
- [ ] Replace hard-coded business names throughout UI/API
- [ ] Allow Admin to update business identity without code deployment

### Operations Administration

- [ ] Driver administration
    - [ ] Add driver
    - [ ] Edit driver
    - [ ] Activate/deactivate driver
    - [ ] Remove/archive driver

- [ ] Route administration
    - [ ] Add route
    - [ ] Edit launch/takeout locations
    - [ ] Activate/deactivate route
    - [ ] Archive route

- [ ] Pricing administration
    - [ ] Edit route prices
    - [ ] Preserve historical reservation pricing
    - [ ] Prevent pricing changes from altering existing reservations

### Benefits Administration

- [x] Business settings storage in D1
- [x] Settings service/API foundation
- [x] Benefits administration page foundation
- [x] Enable/disable lodging benefit
- [x] Configure complimentary shuttles per night
- [x] Configure check-in-day eligibility
- [x] Configure checkout-day eligibility
- [x] Configure rollover/banking behavior
- [ ] Configure eligible lodging booking sources
- [ ] Improve Admin validation / help text
- [ ] Genericize lodging terminology so it is not provider/business specific

---

## Phase 7 - Customer Loyalty Program

### Core Policy Engine

Initial default policy:

- Buy 9 qualifying paid shuttles
- Next shuttle is complimentary

Implementation:

- [ ] Create customer loyalty ledger
- [ ] Determine customer identity/matching strategy
- [ ] Track qualifying paid shuttle events
- [ ] Track earned rewards
- [ ] Track redeemed rewards
- [ ] Handle cancellations/refunds
- [ ] Exclude lodging-included/complimentary shuttles from paid counts
- [ ] Preserve loyalty audit history

### Loyalty Administration

- [ ] Enable/disable loyalty program
- [ ] Configure number of paid shuttles required
- [ ] Configure reward quantity
- [ ] Configure qualifying reservation/payment types
- [ ] View customer loyalty history
- [ ] Manual administrative adjustment with audit trail

---

## Phase 8 - Integrations & Super Administration

### Integration Framework

- [ ] Create generic integration configuration layer
- [ ] Enable/disable integrations independently
- [ ] Integration connection/status reporting
- [ ] Last successful event/sync timestamp
- [ ] Integration diagnostics
- [ ] Test-connection functionality

### Webhook Management

- [ ] Generate/display S-RADs webhook URLs
- [ ] Copy webhook URL from Super Admin
- [ ] Show webhook health/status
- [ ] Show last webhook received
- [ ] Show last external record synchronized
- [ ] Enable/disable webhook processing
- [ ] Support webhook verification/secret tokens where available

### Payment Providers

- [x] Square integration
- [ ] Move Square behind generic payment-provider interface
- [ ] Integration enable/disable control
- [ ] Payment-provider status page
- [ ] Support future payment providers

### Lodging Providers

- [x] Sirvoy integration
- [ ] Generic lodging-provider interface
- [ ] Provider selection in Super Admin
- [ ] Provider-specific configuration
- [ ] Future lodging-provider adapters

### Messaging Providers

- [x] Resend email integration
- [ ] Generic email-provider configuration
- [ ] Twilio SMS integration
- [ ] Notification provider status/testing

### Security

- [ ] Separate Admin and Super Admin permissions
- [ ] Protect sensitive integration settings
- [ ] Never expose stored API secrets after configuration
- [ ] Credential replacement / rotation workflow
- [ ] Integration audit logging

---

## Phase 9 - Productization / Commercial Deployment

### Self-Service Deployment

Goal: normal business changes should not require developer intervention.

- [ ] New-business setup workflow
- [ ] Business configuration wizard
- [ ] Initial driver setup
- [ ] Initial route/pricing setup
- [ ] Payment-provider setup
- [ ] Optional lodging integration setup
- [ ] Email/SMS setup
- [ ] Admin-user setup

### Product Hardening

- [ ] Remove remaining hard-coded customer-specific assumptions
- [ ] Generic terminology throughout customer/admin UI
- [ ] Configuration validation
- [ ] Database migration/version checks
- [ ] Deployment health checks
- [ ] Backup/export strategy
- [ ] Recovery documentation
- [ ] Customer-facing documentation
- [ ] Admin documentation
- [ ] Installation/onboarding documentation

### Commercial Planning

- [ ] Competitive product research
- [ ] Pricing model
- [ ] Licensing/subscription model
- [ ] Hosting/deployment model
- [ ] Support model
- [ ] Terms/privacy documentation
- [ ] Product website / demo deployment

---

## Version Status

| Version | Status | Milestone |
|---|---|---|
| 0.1.x | ✅ Complete | Foundation |
| 0.2.x | ✅ Complete | Reservation System |
| 0.3.0-alpha | ✅ Complete | Dispatch Dashboard |
| 0.3.1–0.3.10-alpha | ✅ Complete | Operations & Integration |
| 0.4.0-beta | 🚧 Current | Productization & Operational Beta |
| 0.4.x-beta | ⏳ Planned | Administration, Benefits & Hardening |
| 0.5.x-beta | ⏳ Planned | Integrations & Commercial Readiness |
| 1.0.0 | 🎯 Goal | Commercial Production Release |

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

- Android
- iOS
- Driver authentication
- Assignment management
- Status updates
- Photo capture
- Push notifications

### Reporting & Analytics

- Revenue reporting
- Route utilization
- Driver utilization
- Benefit/loyalty reporting
- Operational metrics
- Export/report scheduling

### Additional Integrations

- Additional payment providers
- Additional lodging/PMS providers
- Accounting systems
- Mapping/navigation providers
- Additional messaging providers