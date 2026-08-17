import {
        upsertSirvoyBooking
} from "./sirvoy-service.js";

export async function handleSirvoyWebhook(
        request,
        env
) {
        try {
                const booking =
                        await request.json();

                const result =
                        await upsertSirvoyBooking(
                                env,
                                booking
                        );

                return Response.json(
                        result,
                        {
                                status:
                                        result.success
                                                ? 200
                                                : 400,
                        }
                );
        } catch (error) {
                console.error(
                        "Sirvoy webhook failed:",
                        error
                );

                return Response.json(
                        {
                                success: false,
                                message:
                                        "Sirvoy webhook processing failed",
                        },
                        {
                                status: 500,
                        }
                );
        }
}