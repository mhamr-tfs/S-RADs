import {
        getBusinessSettings,
        updateBusinessSetting
} from "./settings-service.js";

const ALLOWED_SETTINGS = {
        lodging_benefit_enabled: {
                type: "boolean",
        },

        lodging_shuttles_per_night: {
                type: "integer",
                min: 0,
                max: 10,
        },

        lodging_allow_checkin_day: {
                type: "boolean",
        },

        lodging_allow_checkout_day: {
                type: "boolean",
        },

        lodging_allow_rollover: {
                type: "boolean",
        },

        loyalty_enabled: {
                type: "boolean",
        },

        loyalty_paid_shuttles_required: {
                type: "integer",
                min: 1,
                max: 100,
        },

        loyalty_reward_shuttles: {
                type: "integer",
                min: 1,
                max: 10,
        },
};

function validateSetting(
        key,
        value
) {
        const definition =
                ALLOWED_SETTINGS[key];

        if (!definition) {
                return {
                        valid: false,
                        reason:
                                "setting_not_allowed",
                };
        }

        if (
                definition.type ===
                "boolean"
        ) {
                if (
                        typeof value !==
                        "boolean"
                ) {
                        return {
                                valid: false,
                                reason:
                                        "invalid_boolean",
                        };
                }

                return {
                        valid: true,
                };
        }

        if (
                definition.type ===
                "integer"
        ) {
                const number =
                        Number(value);

                if (
                        !Number.isInteger(
                                number
                        )
                ) {
                        return {
                                valid: false,
                                reason:
                                        "invalid_integer",
                        };
                }

                if (
                        number <
                                definition.min ||
                        number >
                                definition.max
                ) {
                        return {
                                valid: false,
                                reason:
                                        "value_out_of_range",
                        };
                }

                return {
                        valid: true,
                        value: number,
                };
        }

        return {
                valid: false,
                reason:
                        "unsupported_setting_type",
        };
}

export async function handleGetBusinessSettings(
        env
) {
        const settings =
                await getBusinessSettings(
                        env
                );

        return Response.json(
                {
                        success: true,
                        settings,
                }
        );
}

export async function handleUpdateBusinessSettings(
        request,
        env
) {
        try {
                const body =
                        await request.json();

                if (
                        !body ||
                        typeof body.settings !==
                                "object" ||
                        Array.isArray(
                                body.settings
                        )
                ) {
                        return Response.json(
                                {
                                        success: false,
                                        message:
                                                "Invalid settings payload.",
                                },
                                {
                                        status: 400,
                                }
                        );
                }

                const results = [];

                for (
                        const [
                                key,
                                rawValue,
                        ]
                        of Object.entries(
                                body.settings
                        )
                ) {
                        const validation =
                                validateSetting(
                                        key,
                                        rawValue
                                );

                        if (
                                !validation.valid
                        ) {
                                return Response.json(
                                        {
                                                success: false,
                                                message:
                                                        `Invalid setting: ${key}`,
                                                reason:
                                                        validation.reason,
                                        },
                                        {
                                                status: 400,
                                        }
                                );
                        }

                        const value =
                                validation.value ??
                                rawValue;

                        const result =
                                await updateBusinessSetting(
                                        env,
                                        key,
                                        value
                                );

                        if (!result.success) {
                                return Response.json(
                                        {
                                                success: false,
                                                message:
                                                        `Unable to update setting: ${key}`,
                                                reason:
                                                        result.reason,
                                        },
                                        {
                                                status: 400,
                                        }
                                );
                        }

                        results.push(
                                result
                        );
                }

                return Response.json(
                        {
                                success: true,
                                updated:
                                        results,
                        }
                );
        } catch (error) {
                console.error(
                        "Business settings update failed:",
                        error
                );

                return Response.json(
                        {
                                success: false,
                                message:
                                        "Business settings could not be updated.",
                        },
                        {
                                status: 500,
                        }
                );
        }
}