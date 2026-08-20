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

        return shuttleDate;
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

        const shuttlesPerNight =
                settings
                        .lodging_shuttles_per_night
                        ?.value ?? 1;

        for (
        const candidateDate of
        candidateBenefitDates
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
                                candidateDate
                        )
                        .first();

        const claimCount =
                Number(
                        existing?.claim_count ?? 0
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

        if (!benefitEnabled) {
                return {
                        available: false,
                        reason:
                                "benefit_disabled",
                        benefitDate: null,
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

        const claimCount =
                Number(
                        existing?.claim_count ?? 0
                );
        

        if (
                claimCount >=
                shuttlesPerNight
        ) {
                return {
                        available: false,
                        reason:
                                "benefit_limit_reached",
                        benefitDate,
                        claimCount,
                        limit:
                                shuttlesPerNight,
                };
        }

        return {
                available: true,
                reason:
                        "benefit_available",
                benefitDate,
                claimCount,
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

        const shuttlesPerNight =
                settings
                        .lodging_shuttles_per_night
                        ?.value ?? 1;

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

        const claimCount =
                Number(
                        existing?.claim_count ?? 0
                );

        if (
                claimCount >=
                shuttlesPerNight
        ) {
                return {
                        success: false,
                        reason:
                                "benefit_limit_reached",
                        claimCount,
                        limit:
                                shuttlesPerNight,
                };
        }

        const result =
                await env.DB.prepare(`
                        INSERT INTO lodging_benefit_claims (
                                provider,
                                external_booking_id,
                                reservation_id,
                                benefit_date,
                                status
                        )
                        VALUES (?, ?, ?, ?, 'claimed')
                `)
                        .bind(
                                provider,
                                externalBookingId,
                                reservationId,
                                benefitDate
                        )
                        .run();

        return {
                success: true,
                claimId:
                        result.meta.last_row_id,
                claimCount:
                        claimCount + 1,
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
        };
}