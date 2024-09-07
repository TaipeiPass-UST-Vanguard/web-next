import { Duration } from "luxon";
import CommodityEntity from "../domain/commodityEntity";

export default class CommodityViewModel implements CommodityEntity {
    id: number;
    userId: string;
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

    get giveExpireDuration(): Duration {
        return Duration.fromMillis(this.giveExpireSeconds * 1000);
    }

    get receiveExpireDuration(): Duration {
        return Duration.fromMillis(this.receiveExpireSeconds * 1000);
    }
}
