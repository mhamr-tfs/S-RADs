//* Photo API - Placeholder */
import { uploadPhoto } from "./photo-service.js";

export async function handlePhotoUpload(request, env) {
    return await uploadPhoto(request, env);
}

