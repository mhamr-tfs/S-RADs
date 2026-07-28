export async function uploadPhoto(request, env) {
    const formData = await request.formData();

    const reservationId = formData.get("reservation_id");
    const photo = formData.get("photo");

    if (!reservationId) {
        return Response.json(
            {
                success: false,
                message: "Missing reservation_id."
            },
            { status: 400 }
        );
    }

    if (!photo || typeof photo === "string") {
        return Response.json(
            {
                success: false,
                message: "No photo uploaded."
            },
            { status: 400 }
        );
    }

    const storageKey =
    `reservations/${reservationId}/${crypto.randomUUID()}-${photo.name}`;

await env.binding_PHOTOS_BUCKET.put(
    storageKey,
    await photo.arrayBuffer(),
    {
        httpMetadata: {
            contentType: photo.type
        }
    }
);

let result;

try {
    result = await env.DB.prepare(`
        INSERT INTO photos (
            reservation_id,
            photo_type,
            uploaded_by,
            file_name,
            storage_key,
            content_type
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(
        reservationId,
        "vehicle",
        "system",
        photo.name,
        storageKey,
        photo.type
    )
    .run();
} catch (error) {
    console.log(`D1 insert failed. Deleting R2 object: ${storageKey}`);

    await env.binding_PHOTOS_BUCKET.delete(storageKey);

    console.log(`Deleted R2 object: ${storageKey}`);

    return Response.json(
        {
            success: false,
            message: "Photo could not be linked to the reservation.",
            error: error.message
        },
        { status: 400 }
    );
}
return Response.json({
    success: true,
    photo_id: result.meta.last_row_id,
    reservation_id: reservationId,
    storage_key: storageKey,
    file_name: photo.name
});
}