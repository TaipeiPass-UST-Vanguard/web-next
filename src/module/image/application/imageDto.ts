import ImageEntity from "../domain/imageEntity";

export default class ImageDto implements ImageEntity {
    id: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: ImageEntity) {
        this.id = entity.id;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    static fromJson(json: any): ImageEntity {
        return {
            id: json.id,
            createdTime: new Date(json.createdTime),
            updatedTime: new Date(json.updatedTime),
        };
    }
}
