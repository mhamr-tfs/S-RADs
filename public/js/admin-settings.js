import { 
	loadAppVersion 
     } from "./app-version.js";
const controls = {
        lodging_benefit_enabled:
                document.getElementById(
                        "lodging-benefit-enabled"
                ),

        lodging_shuttles_per_night:
                document.getElementById(
                        "lodging-shuttles-per-night"
                ),

        lodging_allow_checkin_day:
                document.getElementById(
                        "lodging-allow-checkin-day"
                ),

        lodging_allow_checkout_day:
                document.getElementById(
                        "lodging-allow-checkout-day"
                ),

        lodging_allow_rollover:
                document.getElementById(
                        "lodging-allow-rollover"
                ),

        loyalty_enabled:
                document.getElementById(
                        "loyalty-enabled"
                ),

        loyalty_paid_shuttles_required:
                document.getElementById(
                        "loyalty-paid-shuttles-required"
                ),

        loyalty_reward_shuttles:
                document.getElementById(
                        "loyalty-reward-shuttles"
                ),
};

const statusMessage =
        document.getElementById(
                "settings-status"
        );

const saveButton =
        document.getElementById(
                "save-settings"
        );

function setControlValue(
        control,
        type,
        value
) {
        if (type === "boolean") {
                control.checked =
                        Boolean(value);

                return;
        }

        control.value =
                value;
}

function getControlValue(
        control,
        type
) {
        if (type === "boolean") {
                return control.checked;
        }

        if (type === "integer") {
                return Number.parseInt(
                        control.value,
                        10
                );
        }

        return control.value;
}

async function loadSettings() {
        statusMessage.textContent =
                "Loading settings...";

        try {
                const response =
                        await fetch(
                                "/api/admin/settings"
                        );

                const data =
                        await response.json();

                if (
                        !response.ok ||
                        !data.success
                ) {
                        throw new Error(
                                data.message ||
                                "Unable to load settings."
                        );
                }

                for (
                        const [
                                key,
                                setting,
                        ]
                        of Object.entries(
                                data.settings
                        )
                ) {
                        const control =
                                controls[key];

                        if (!control) {
                                continue;
                        }

                        setControlValue(
                                control,
                                setting.type,
                                setting.value
                        );
                }

                statusMessage.textContent =
                        "Settings loaded.";
        } catch (error) {
                console.error(
                        "Settings load failed:",
                        error
                );

                statusMessage.textContent =
                        "Settings could not be loaded.";
        }
}

async function saveSettings() {
        saveButton.disabled = true;

        statusMessage.textContent =
                "Saving settings...";

        try {
                const current =
                        await fetch(
                                "/api/admin/settings"
                        );

                const currentData =
                        await current.json();

                if (
                        !current.ok ||
                        !currentData.success
                ) {
                        throw new Error(
                                "Unable to read current settings."
                        );
                }

                const settings = {};

                for (
                        const [
                                key,
                                setting,
                        ]
                        of Object.entries(
                                currentData.settings
                        )
                ) {
                        const control =
                                controls[key];

                        if (!control) {
                                continue;
                        }

                        settings[key] =
                                getControlValue(
                                        control,
                                        setting.type
                                );
                }

                const response =
                        await fetch(
                                "/api/admin/settings",
                                {
                                        method: "PATCH",

                                        headers: {
                                                "Content-Type":
                                                        "application/json",
                                        },

                                        body:
                                                JSON.stringify({
                                                        settings,
                                                }),
                                }
                        );

                const data =
                        await response.json();

                if (
                        !response.ok ||
                        !data.success
                ) {
                        throw new Error(
                                data.message ||
                                "Unable to save settings."
                        );
                }

                statusMessage.textContent =
                        "Settings saved successfully.";
        } catch (error) {
                console.error(
                        "Settings save failed:",
                        error
                );

                statusMessage.textContent =
                        error.message ||
                        "Settings could not be saved.";
        } finally {
                saveButton.disabled = false;
        }
}

saveButton.addEventListener(
        "click",
        saveSettings
);

// ======================================================
// Admin inactivity lock
// ======================================================

const ADMIN_IDLE_LIMIT =
        10 * 60 * 1000;

const ADMIN_WARNING_TIME =
        9 * 60 * 1000;

let idleLockTimer;
let idleWarningTimer;

function resetAdminIdleTimer() {
        clearTimeout(
                idleWarningTimer
        );

        clearTimeout(
                idleLockTimer
        );

        idleWarningTimer =
                setTimeout(
                        showIdleWarning,
                        ADMIN_WARNING_TIME
                );

        idleLockTimer =
                setTimeout(
                        lockAdminSession,
                        ADMIN_IDLE_LIMIT
                );
}

function showIdleWarning() {
        statusMessage.textContent =
                "Administrative session will lock in 1 minute due to inactivity.";
}

function lockAdminSession() {
        for (
                const control of
                Object.values(controls)
        ) {
                control.disabled = true;
        }

        saveButton.disabled = true;

        statusMessage.textContent =
                "Administrative session locked due to inactivity. Reload the page to continue.";

        document.removeEventListener(
                "mousemove",
                resetAdminIdleTimer
        );

        document.removeEventListener(
                "keydown",
                resetAdminIdleTimer
        );

        document.removeEventListener(
                "click",
                resetAdminIdleTimer
        );

        document.removeEventListener(
                "touchstart",
                resetAdminIdleTimer
        );
}

const activityEvents = [
        "mousemove",
        "keydown",
        "click",
        "touchstart",
];

for (
        const eventName of
        activityEvents
) {
        document.addEventListener(
                eventName,
                resetAdminIdleTimer
        );
}

resetAdminIdleTimer();
loadAppVersion();
loadSettings();