import { getFilteredReservations } from "./filters.js";

function escapeCsvValue(value) {
        const text =
                value === null ||
                value === undefined
                        ? ""
                        : String(value);

        if (
                text.includes(",") ||
                text.includes('"') ||
                text.includes("\n")
        ) {
                return `"${text.replaceAll('"', '""')}"`;
        }

        return text;
}

function getExportRows() {
        return getFilteredReservations().map(
                (reservation) => ({
                        "Shuttle Date":
                                reservation.shuttle_date || "",
                        "Takeout Time":
                                reservation.expected_takeout_time || "",
                        "First Name":
                                reservation.first_name || "",
                        "Last Name":
                                reservation.last_name || "",
                        Phone:
                                reservation.phone || "",
                        Email:
                                reservation.email || "",
                        "Launch Site":
                                reservation.launch_site || "",
                        "Takeout Site":
                                reservation.takeout_site || "",
                        "Vehicle Year":
                                reservation.vehicle_year || "",
                        "Vehicle Make":
                                reservation.vehicle_make || "",
                        "Vehicle Model":
                                reservation.vehicle_model || "",
                        "Vehicle Color":
                                reservation.vehicle_color || "",
                        "License Plate":
                                reservation.license_plate || "",
                        "License State":
                                reservation.license_state || "",
                        "License County":
                                reservation.license_county || "",
                        "Key Location":
                                reservation.key_location || "",
                        Driver:
                                reservation.driver || "",
                        Status:
                                reservation.status || "",
                        "Payment Method":
                                reservation.payment_method || "",
                        "Payment Status":
                                reservation.payment_status || "",
                        "Special Instructions":
                                reservation.special_instructions || "",
                })
        );
}

function downloadFile(
        contents,
        filename,
        mimeType
) {
        const blob =
                new Blob(
                        [contents],
                        {
                                type: mimeType,
                        }
                );

        const url =
                URL.createObjectURL(blob);

        const link =
                document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
}

export function exportFilteredReservationsToCsv() {
        const rows = getExportRows();

        if (!rows.length) {
                alert(
                        "There are no reservations matching the current filters."
                );

                return;
        }

        const headers =
                Object.keys(rows[0]);

        const lines = [
                headers
                        .map(escapeCsvValue)
                        .join(","),
                ...rows.map(
                        (row) =>
                                headers
                                        .map(
                                                (header) =>
                                                        escapeCsvValue(
                                                                row[header]
                                                        )
                                        )
                                        .join(",")
                ),
        ];

        const today =
                new Date()
                        .toISOString()
                        .slice(0, 10);

        downloadFile(
                lines.join("\r\n"),
                `S-RADs-Reservations-${today}.csv`,
                "text/csv;charset=utf-8"
        );
}

export async function exportFilteredReservationsToExcel() {
        const rows = getExportRows();

        if (!rows.length) {
                alert(
                        "There are no reservations matching the current filters."
                );

                return;
        }

        const XLSX =
                await import(
                        "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs"
                );

        const worksheet =
                XLSX.utils.json_to_sheet(
                        rows
                );

        worksheet["!cols"] = [
                { wch: 12 },
                { wch: 12 },
                { wch: 16 },
                { wch: 16 },
                { wch: 16 },
                { wch: 28 },
                { wch: 24 },
                { wch: 24 },
                { wch: 12 },
                { wch: 16 },
                { wch: 16 },
                { wch: 14 },
                { wch: 16 },
                { wch: 14 },
                { wch: 16 },
                { wch: 18 },
                { wch: 16 },
                { wch: 16 },
                { wch: 18 },
                { wch: 18 },
                { wch: 40 },
        ];

        const workbook =
                XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Reservations"
        );

        const today =
                new Date()
                        .toISOString()
                        .slice(0, 10);

        XLSX.writeFile(
                workbook,
                `S-RADs-Reservations-${today}.xlsx`
        );
}