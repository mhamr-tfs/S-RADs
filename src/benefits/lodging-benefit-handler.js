import {
        validateLodgingBenefit
} from "./lodging-benefit-service.js";

import {
        createSirvoyBenefitProvider
} from "../integrations/sirvoy/sirvoy-benefit-provider.js";

import {
        checkLodgingBenefitAvailability
} from "./lodging-claim-service.js";

function getLodgingProvider(env) {
        const integration =
                env.LODGING_INTEGRATION ||
                "sirvoy";

        if (integration === "sirvoy") {
                return createSirvoyBenefitProvider(
                        env
                );
        }

        return null;
}

export async function handleLodgingBenefitValidation(
        request,
        env
) {
        try {
                const body =
                        await request.json();

                const provider =
                        getLodgingProvider(
                                env
                        );

                const result =
                        await validateLodgingBenefit(
                                provider,
                                {
                                        bookingId:
                                                body.bookingId,

                                        shuttleDate:
                                                body.shuttleDate,
                                }
                        );
const availability =
        await checkLodgingBenefitAvailability(
                env,
                {
                        provider:
                                "sirvoy",

                        externalBookingId:
                                String(
                                        body.bookingId
                                ).trim(),

                        shuttleDate:
                                body.shuttleDate,

                        arrivalDate:
                                result.arrivalDate,

                        departureDate:
                                result.departureDate,
                }
        );

return Response.json(
        {
                ...result,
                benefitAvailable:
                        availability.available,

                benefitDate:
                        availability.benefitDate,

                benefitReason:
                        availability.reason,
        },
        {
                status: 200,
        }
);
        } catch (error) {
                console.error(
                        "Lodging benefit validation failed:",
                        error
                );

                return Response.json(
                        {
                                valid: false,
                                eligible: false,
                                reason:
                                        "validation_error",
                        },
                        {
                                status: 500,
                        }
                );
        }
}