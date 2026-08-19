function parseSettingValue(
        value,
        type
) {
        switch (type) {
                case "boolean":
                        return value === "true";

                case "integer":
                        return Number.parseInt(
                                value,
                                10
                        );

                default:
                        return value;
        }
}

function serializeSettingValue(
        value,
        type
) {
        switch (type) {
                case "boolean":
                        return value
                                ? "true"
                                : "false";

                case "integer":
                        return String(
                                Number.parseInt(
                                        value,
                                        10
                                )
                        );

                default:
                        return String(value);
        }
}

export async function getBusinessSettings(
        env
) {
        const result =
                await env.DB.prepare(`
                        SELECT
                                setting_key,
                                setting_value,
                                setting_type,
                                description,
                                updated_at
                        FROM business_settings
                        ORDER BY setting_key
                `).all();

        const settings = {};

        for (
                const row of result.results
        ) {
                settings[row.setting_key] = {
                        value:
                                parseSettingValue(
                                        row.setting_value,
                                        row.setting_type
                                ),

                        type:
                                row.setting_type,

                        description:
                                row.description,

                        updatedAt:
                                row.updated_at,
                };
        }

        return settings;
}

export async function updateBusinessSetting(
        env,
        settingKey,
        value
) {
        const existing =
                await env.DB.prepare(`
                        SELECT
                                setting_type
                        FROM business_settings
                        WHERE setting_key = ?
                        LIMIT 1
                `)
                        .bind(settingKey)
                        .first();

        if (!existing) {
                return {
                        success: false,
                        reason:
                                "setting_not_found",
                };
        }

        const serializedValue =
                serializeSettingValue(
                        value,
                        existing.setting_type
                );

        const now =
                new Date().toISOString();

        await env.DB.prepare(`
                UPDATE business_settings
                SET
                        setting_value = ?,
                        updated_at = ?
                WHERE setting_key = ?
        `)
                .bind(
                        serializedValue,
                        now,
                        settingKey
                )
                .run();

        return {
                success: true,
                settingKey,
                value:
                        parseSettingValue(
                                serializedValue,
                                existing.setting_type
                        ),
                updatedAt: now,
        };
}