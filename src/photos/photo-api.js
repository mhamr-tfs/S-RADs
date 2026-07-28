//* Photo API - Placeholder */
import {
    uploadPhoto,
    listPhotos
} from "./photo-service.js";

export async function handlePhotoUpload(request, env) {
    return await uploadPhoto(request, env);
}
export async function handlePhotoList(request, env) {
    return await listPhotos(request, env);
}

