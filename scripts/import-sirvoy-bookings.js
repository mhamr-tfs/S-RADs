import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args =
        process.argv.slice(2);

const csvPath =
        args.find(
                (arg) =>
                        !arg.startsWith("--")
        );

const useRemote =
        args.includes("--remote");

const useLocal =
        args.includes("--local");

if (!csvPath) {
        console.error(
                "Usage: node scripts/import-sirvoy-bookings.js <csv-file> --local|--remote"
        );

        process.exit(1);
}

if (
        useRemote === useLocal
) {
        console.error(
                "Specify exactly one of --local or --remote."
        );

        process.exit(1);
}

if (
        !fs.existsSync(csvPath)
) {
        console.error(
                `CSV file not found: ${csvPath}`
        );

        process.exit(1);
}

function parseCsv(text) {
        const rows = [];

        let row = [];
        let field = "";
        let inQuotes = false;

        for (
                let index = 0;
                index < text.length;
                index++
        ) {
                const character =
                        text[index];

                if (inQuotes) {
                        if (
                                character === '"' &&
                                text[index + 1] === '"'
                        ) {
                                field += '"';
                                index++;
                        } else if (
                                character === '"'
                        ) {
                                inQuotes = false;
                        } else {
                                field += character;
                        }

                        continue;
                }

                if (character === '"') {
                        inQuotes = true;
                        continue;
                }

                if (character === ",") {
                        row.push(field);
                        field = "";
                        continue;
                }

                if (
                        character === "\n"
                ) {
                        row.push(field);

                        rows.push(row);

                        row = [];
                        field = "";

                        continue;
                }

                if (
                        character !== "\r"
                ) {
                        field += character;
                }
        }

        if (
                field.length > 0 ||
                row.length > 0
        ) {
                row.push(field);
                rows.push(row);
        }

        return rows;
}

function normalizeSource(
        internalNote
) {
        const note =
                String(
                        internalNote ?? ""
                ).trim();

        if (
                note.startsWith(
                        "Front desk"
                )
        ) {
                return "Front desk";
        }

        if (
                note.startsWith(
                        "Website"
                )
        ) {
                return "Website";
        }

        if (
                note.startsWith(
                        "Booking.com"
                )
        ) {
                return "Booking.com";
        }

        if (
                note.startsWith(
                        "Expedia"
                )
        ) {
                return "Expedia";
        }

        if (
                note.startsWith(
                        "Hotels.com"
                )
        ) {
                return "Hotels.com";
        }

        return note || "Unknown";
}

function sqlValue(value) {
        if (
                value === null ||
                value === undefined
        ) {
                return "NULL";
        }

        return (
                "'" +
                String(value)
                        .replaceAll(
                                "'",
                                "''"
                        ) +
                "'"
        );
}

const contents =
        fs.readFileSync(
                csvPath,
                "utf8"
        )
                .replace(
                        /^\uFEFF/,
                        ""
                );

const rows =
        parseCsv(contents);

if (
        rows.length < 2
) {
        console.error(
                "CSV contains no booking rows."
        );

        process.exit(1);
}

const headers =
        rows[0];

const requiredHeaders = [
        "Booking ID",
        "Check-in",
        "Check-out",
        "Internal note",
        "Confirmed",
];

for (
        const requiredHeader
        of requiredHeaders
) {
        if (
                !headers.includes(
                        requiredHeader
                )
        ) {
                console.error(
                        `Missing required CSV column: ${requiredHeader}`
                );

                process.exit(1);
        }
}

const headerIndex =
        Object.fromEntries(
                headers.map(
                        (
                                header,
                                index
                        ) => [
                                header,
                                index,
                        ]
                )
        );

const bookings =
        new Map();

for (
        const row
        of rows.slice(1)
) {
        const bookingId =
                String(
                        row[
                                headerIndex[
                                        "Booking ID"
                                ]
                        ] ?? ""
                ).trim();

        if (!bookingId) {
                continue;
        }

        const booking = {
                bookingId,

                arrivalDate:
                        String(
                                row[
                                        headerIndex[
                                                "Check-in"
                                        ]
                                ] ?? ""
                        ).trim(),

                departureDate:
                        String(
                                row[
                                        headerIndex[
                                                "Check-out"
                                        ]
                                ] ?? ""
                        ).trim(),

                bookingSource:
                        normalizeSource(
                                row[
                                        headerIndex[
                                                "Internal note"
                                        ]
                                ]
                        ),

                confirmed:
                        String(
                                row[
                                        headerIndex[
                                                "Confirmed"
                                        ]
                                ] ?? ""
                        )
                                .trim()
                                .toLowerCase() ===
                        "yes",
        };

        /*
         * Sirvoy-compatible exports can contain
         * more than one row for a booking when
         * multiple rooms are attached.
         *
         * All rows share the booking-level fields
         * that S-RADs cares about, so one booking
         * ID becomes one cache record.
         */
        bookings.set(
                bookingId,
                booking
        );
}

const sourceCounts = {};

for (
        const booking
        of bookings.values()
) {
        sourceCounts[
                booking.bookingSource
        ] =
                (
                        sourceCounts[
                                booking.bookingSource
                        ] ?? 0
                ) + 1;
}

const statements = [];

for (
        const booking
        of bookings.values()
) {
        statements.push(`
INSERT INTO sirvoy_bookings (
        booking_id,
        arrival_date,
        departure_date,
        booking_source,
        channel_booking_id,
        cancelled,
        confirmed,
        generated_at,
        updated_at
)
VALUES (
        ${sqlValue(
                booking.bookingId
        )},
        ${sqlValue(
                booking.arrivalDate
        )},
        ${sqlValue(
                booking.departureDate
        )},
        ${sqlValue(
                booking.bookingSource
        )},
        NULL,
        0,
        ${booking.confirmed ? 1 : 0},
        NULL,
        CURRENT_TIMESTAMP
)

ON CONFLICT(booking_id)
DO UPDATE SET
        arrival_date =
                excluded.arrival_date,

        departure_date =
                excluded.departure_date,

        booking_source =
                excluded.booking_source,

        channel_booking_id =
                excluded.channel_booking_id,

        cancelled =
                excluded.cancelled,

        confirmed =
                excluded.confirmed,

        updated_at =
                excluded.updated_at

WHERE
        sirvoy_bookings.generated_at
                IS NULL;
`);
}

const sql =
        statements.join("\n");

const outputDirectory =
        path.join(
                process.cwd(),
                ".tmp"
        );

fs.mkdirSync(
        outputDirectory,
        {
                recursive: true,
        }
);

const sqlPath =
        path.join(
                outputDirectory,
                "sirvoy-booking-import.sql"
        );

fs.writeFileSync(
        sqlPath,
        sql,
        "utf8"
);

console.log("");
console.log(
        `CSV rows read: ${rows.length - 1}`
);
console.log(
        `Unique bookings: ${bookings.size}`
);
console.log("");
console.log(
        "Booking source breakdown:"
);

for (
        const [
                source,
                count,
        ]
        of Object.entries(
                sourceCounts
        ).sort()
) {
        console.log(
                `  ${source}: ${count}`
        );
}

console.log("");
console.log(
        `Generated SQL: ${sqlPath}`
);
console.log("");

const locationArgument =
        useRemote
                ? "--remote"
                : "--local";

console.log(
        `Applying import to ${useRemote ? "REMOTE" : "LOCAL"} D1...`
);

const result =
        spawnSync(
                "cmd.exe",
                [
                        "/c",
                        "npx",
                        "wrangler",
                        "d1",
                        "execute",
                        "tfs_shuttles_database",
                        locationArgument,
                        "--file",
                        sqlPath,
                ],
                {
                        stdio: "inherit",
                }
        );

if (
        result.error
) {
        console.error(
                "Unable to start Wrangler:",
                result.error
        );

        process.exit(1);
}

if (
        result.status !== 0
) {
        console.error(
                "Sirvoy import failed."
        );

        process.exit(
                result.status ?? 1
        );
}

console.log("");
console.log(
        "Sirvoy booking import completed successfully."
);