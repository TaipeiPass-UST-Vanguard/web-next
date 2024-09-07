import CommodityEntity from "../domain/commodityEntity";

export default class CommodityDto implements CommodityEntity {
    id: number;
    userId: string;
    storageGroupId: number;
    name: string;
    description: string;
    images: number[];
    status: string;
    category: string;
    condition: string;
    expireTime: Date;
    giveExpireSeconds: number;
    receiveExpireSeconds: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: CommodityEntity) {
        this.id = entity.id;
        this.userId = entity.userId;
        this.storageGroupId = entity.storageGroupId;
        this.name = entity.name;
        this.description = entity.description;
        this.images = entity.images;
        this.status = entity.status;
        this.category = entity.category;
        this.condition = entity.condition;
        this.expireTime = entity.expireTime;
        this.giveExpireSeconds = entity.giveExpireSeconds;
        this.receiveExpireSeconds = entity.receiveExpireSeconds;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    static fromJson(json: any): CommodityEntity {
        return {
            id: json.id,
            userId: json.userId,
            storageGroupId: json.storageGroupId,
            name: json.name,
            description: json.description,
            images: json.images,
            status: json.status,
            category: json.category,
            condition: json.condition,
            expireTime: new Date(json.expireTime),
            giveExpireSeconds: json.giveExpireSeconds,
            receiveExpireSeconds: json.receiveExpireSeconds,
            createdTime: new Date(json.createdTime),
            updatedTime: new Date(json.updatedTime),
        }
    }
}
