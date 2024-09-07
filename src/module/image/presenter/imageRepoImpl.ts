import axios from "axios";
import ImageEntity from "../domain/imageEntity";
import ImageRepo, { ImageUploadCallback } from "../domain/imageRepo";
import { BACKEND_URL } from "@/config/config";
import ImageDto from "../application/imageDto";

export default class ImageRepoImpl implements ImageRepo {
    async upload(file: File, onProgress?: ImageUploadCallback): Promise<ImageEntity> {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(new URL("/api/image", BACKEND_URL).href, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
                onProgress?.(event.total === undefined ? Number.NaN : event.loaded / event.total!);
            },
        });

        if (response.status !== 201) return Promise.reject(response);

        return ImageDto.fromJson(response.data["data"]);
    }
}
