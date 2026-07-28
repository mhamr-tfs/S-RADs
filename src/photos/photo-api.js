//* Photo API - Placeholder */
import {
    uploadPhoto,
    listPhotos,
    getPhotoFile
} from "./photo-service.js";

export async function handlePhotoUpload(request, env) {
    return await uploadPhoto(request, env);
}
export async function handlePhotoList(request, env) {
    return await listPhotos(request, env);
}
export async function handlePhotoFile(request, env) {
    return await getPhotoFile(request, env);
}
