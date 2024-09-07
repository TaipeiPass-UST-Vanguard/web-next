import { Duration } from "luxon";

export default interface CommodityEntity {
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
}
