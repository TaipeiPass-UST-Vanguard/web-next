import { StorageEntity } from "../domain/storageEntity";

export default class StorageDto implements StorageEntity {
    id: number;
    groupId: number;
    commodityId: number | undefined;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: StorageEntity) {
        this.id = entity.id;
        this.groupId = entity.groupId;
        this.commodityId = entity.commodityId;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    static fromJson(json: any): StorageEntity {
        return {
            id: json.id,
            groupId: json.groupId,
            commodityId: json.commodityId,
            createdTime: new Date(json.createdTime),
            updatedTime: new Date(json.updatedTime),
        }
    }
}
