import { Duration } from "luxon";
import CommodityEntity from "../domain/commodityEntity";
import CommodityStatus from "../domain/commodityStatus";
import CommodityCategory from "../domain/commodityCategory";
import CommodityCondition from "../domain/commodityCondition";
import { format } from "date-fns";
import { commodityCategoryString, commodityConditionString, commodityStatusString } from "./commodityStrings";

export default class CommodityViewModel implements CommodityEntity {
    id: number;
    userId: string;
    receiverId: string;
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
        this.receiverId = entity.receiverId;
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

    get expireTimeString(): string {
        return format(this.expireTime, "yyyy-MM-dd");
    }

    get giveExpireDuration(): Duration {
        
        return Duration.fromMillis(this.giveExpireSeconds * 1000).rescale();
    }

    get receiveExpireDuration(): Duration {
        console.log(this.receiveExpireSeconds, Duration.fromMillis(this.receiveExpireSeconds * 1000).rescale());
        return Duration.fromMillis(this.receiveExpireSeconds * 1000).rescale();
    }

    get statusString(): string {
       return commodityStatusString(this.status);
    }

    get categoryString(): string {
       return commodityCategoryString(this.category); 
    }

    get conditionString(): string {
        return commodityConditionString(this.condition);
    }
}
