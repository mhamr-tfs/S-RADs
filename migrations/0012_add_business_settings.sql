CREATE TABLE business_settings (
    setting_key TEXT PRIMARY KEY,
    setting_value TEXT NOT NULL,
    setting_type TEXT NOT NULL DEFAULT 'text',
    description TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO business_settings (
    setting_key,
    setting_value,
    setting_type,
    description
)
VALUES
    (
        'lodging_benefit_enabled',
        'true',
        'boolean',
        'Enable complimentary lodging shuttle benefits'
    ),
    (
        'lodging_shuttles_per_night',
        '1',
        'integer',
        'Complimentary shuttles allowed per eligible motel night'
    ),
    (
        'lodging_allow_checkin_day',
        'true',
        'boolean',
        'Allow complimentary shuttle use on check-in day'
    ),
    (
        'lodging_allow_checkout_day',
        'true',
        'boolean',
        'Allow complimentary shuttle use on checkout day'
    ),
    (
        'lodging_allow_rollover',
        'false',
        'boolean',
        'Allow unused complimentary shuttle benefits to roll forward'
    ),
    (
        'loyalty_enabled',
        'false',
        'boolean',
        'Enable customer shuttle loyalty program'
    ),
    (
        'loyalty_paid_shuttles_required',
        '9',
        'integer',
        'Number of qualifying paid shuttles required to earn a reward'
    ),
    (
        'loyalty_reward_shuttles',
        '1',
        'integer',
        'Number of complimentary shuttles earned per loyalty reward'
    );