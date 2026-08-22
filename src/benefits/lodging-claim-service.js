import {
        getBusinessSettings
} from "../settings/settings-service.js";

function previousDate(dateString) {
        const date =
                new Date(
                        `${dateString}T00:00:00Z`
                );

        date.setUTCDate(
                date.getUTCDate() - 1
        );

        return date
                .toISOString()
                .slice(0, 10);
}

function dateRange(
        startDate,
        endDate
) {
        const dates = [];

        const current =
                new Date(
                        `${startDate}T00:00:00Z`
                );

        const end =
                new Date(
                        `${endDate}T00:00:00Z`
                );

        while (
                current <= end
        ) {
                dates.push(
                        current
                                .toISOString()
                                .slice(0, 10)
                );

                current.setUTCDate(
                        current.getUTCDate() + 1
                );
        }

        return dates;
}

export function calculateBenefitDate({
        shuttleDate,
        arrivalDate,
        departureDate,
        allowCheckinDay = true,
        allowCheckoutDay = true,
}) {
        if (
                shuttleDate < arrivalDate ||
                shuttleDate > departureDate
        ) {
                return null;
        }

        if (
                shuttleDate === arrivalDate &&
                !allowCheckinDay
        ) {
                return null;
        }

        if (
                shuttleDate === departureDate
        ) {
                if (!allowCheckoutDay) {
                        return null;
                }

                return previousDate(
                        departureDate
                );
        }

        return shuttleDate;
}

async function getActiveClaimCount(
        env,
        {
                provider,
                externalBookingId,
                benefitDate,
        }
) {
        const existing =
                await env.DB.prepare(`
                        SELECT
                                COUNT(*) AS claim_count
                        FROM lodging_benefit_claims
                        WHERE provider = ?
                          AND external_booking_id = ?
                          AND benefit_date = ?
                          AND status = 'claimed'
                `)
                        .bind(
                                provider,
                                externalBookingId,
                                benefitDate
                        )
                        .first();

        return Number(
                existing?.claim_count ?? 0
        );
}

export async function checkLodgingBenefitAvailability(
        env,
        {
                provider,
                externalBookingId,
                shuttleDate,
                arrivalDate,
                departureDate,
        }
) {
        const settings =
                await getBusinessSettings(
                        env
                );

        const benefitEnabled =
                settings
                        .lodging_benefit_enabled
                        ?.value ?? true;

        const allowCheckinDay =
                settings
                        .lodging_allow_checkin_day
                        ?.value ?? true;

        const allowCheckoutDay =
                settings
                        .lodging_allow_checkout_day
                        ?.value ?? true;

        const allowRollover =
                settings
                        .lodging_allow_rollover
                        ?.value ?? false;

        const shuttlesPerNight =
                Math.max(
                        0,
                        Number(
                                settings
                                        .lodging_shuttles_per_night
                                        ?.value ?? 1
                        )
                );

        if (!benefitEnabled) {
                return {
                        available: false,
                        reason:
                                "benefit_disabled",
                        benefitDate: null,
                };
        }

        if (
                shuttlesPerNight <= 0
        ) {
                return {
                        available: false,
                        reason:
                                "benefit_limit_reached",
                        benefitDate: null,
                        claimCount: 0,
                        limit: 0,
                };
        }

        const benefitDate =
                calculateBenefitDate({
                        shuttleDate,
                        arrivalDate,
                        departureDate,
                        allowCheckinDay,
                        allowCheckoutDay,
                });

        if (!benefitDate) {
                return {
                        available: false,
                        reason:
                                "outside_stay_dates",
                        benefitDate: null,
                };
        }

        const candidateBenefitDates =
                allowRollover
                        ? dateRange(
                                arrivalDate,
                                benefitDate
                        )
                        : [
                                benefitDate,
                        ];

        /*
         * When rollover is enabled, consume the
         * oldest unused entitlement first.
         */
        for (
                const candidateDate
                of candidateBenefitDates
        ) {
                const claimCount =
                        await getActiveClaimCount(
                                env,
                                {
                                        provider,
                                        externalBookingId,
                                        benefitDate:
                                                candidateDate,
                                }
                        );

                if (
                        claimCount <
                        shuttlesPerNight
                ) {
                        return {
                                available: true,
                                reason:
                                        "benefit_available",
                                benefitDate:
                                        candidateDate,
                                claimCount,
                                limit:
                                        shuttlesPerNight,
                        };
                }
        }

        return {
                available: false,
                reason:
                        "benefit_limit_reached",
                benefitDate,
                limit:
                        shuttlesPerNight,
        };
}

export async function claimLodgingBenefit(
        env,
        {
                provider,
                externalBookingId,
                reservationId = null,
                benefitDate,
        }
) {
        const settings =
                await getBusinessSettings(
                        env
                );

        const benefitEnabled =
                settings
                        .lodging_benefit_enabled
                        ?.value ?? true;

        const shuttlesPerNight =
                Math.max(
                        0,
                        Number(
                                settings
                                        .lodging_shuttles_per_night
                                        ?.value ?? 1
                        )
                );

        if (
                !benefitEnabled ||
                shuttlesPerNight <= 0
        ) {
                return {
                        success: false,
                        reason:
                                benefitEnabled
                                        ? "benefit_limit_reached"
                                        : "benefit_disabled",
                        limit:
                                shuttlesPerNight,
                };
        }

        /*
         * The limit check and INSERT happen in one
         * SQL statement. This prevents two nearly
         * simultaneous requests from both seeing
         * an available slot and exceeding the
         * configured per-night limit.
         */
        const result =
                await env.DB.prepare(`
                        INSERT INTO lodging_benefit_claims (
                                provider,
                                external_booking_id,
                                reservation_id,
                                benefit_date,
                                status
                        )
                        SELECT
                                ?,
                                ?,
                                ?,
                                ?,
                                'claimed'
                        WHERE (
                                SELECT COUNT(*)
                                FROM lodging_benefit_claims
                                WHERE provider = ?
                                  AND external_booking_id = ?
                                  AND benefit_date = ?
                                  AND status = 'claimed'
                        ) < ?
                `)
                        .bind(
                                provider,
                                externalBookingId,
                                reservationId,
                                benefitDate,

                                provider,
                                externalBookingId,
                                benefitDate,
                                shuttlesPerNight
                        )
                        .run();

        const inserted =
                Number(
                        result.meta?.changes ?? 0
                ) > 0;

        const claimCount =
                await getActiveClaimCount(
                        env,
                        {
                                provider,
                                externalBookingId,
                                benefitDate,
                        }
                );

        if (!inserted) {
                return {
                        success: false,
                        reason:
                                "benefit_limit_reached",
                        claimCount,
                        limit:
                                shuttlesPerNight,
                };
        }

        return {
                success: true,
                claimId:
                        result.meta.last_row_id,
                claimCount,
                limit:
                        shuttlesPerNight,
        };
}

export async function releaseLodgingBenefit(
        env,
        {
                claimId,
        }
) {
        const now =
                new Date().toISOString();

        const result =
                await env.DB.prepare(`
                        UPDATE lodging_benefit_claims
                        SET
                                status = 'released',
                                released_at = ?
                        WHERE id = ?
                          AND status = 'claimed'
                `)
                        .bind(
                                now,
                                claimId
                        )
                        .run();

        return {
                success: true,
                released:
                        Number(
                                result.meta?.changes ?? 0
                        ) > 0,
        };
}