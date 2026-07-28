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

    return Response.json({
        success: true,
        reservation_id: reservationId,
        file_name: photo.name,
        content_type: photo.type,
        file_size: photo.size,
        storage_key: storageKey
    });
}