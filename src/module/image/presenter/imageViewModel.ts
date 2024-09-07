import { BACKEND_URL } from "@/config/config";
import ImageEntity from "../domain/imageEntity";

export default class ImageViewModel implements ImageEntity {
    id: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: ImageEntity) {
        this.id = entity.id;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    get imageUrl(): string {
        return new URL(`/api/image/${this.id}`, BACKEND_URL).href;
    }
}
