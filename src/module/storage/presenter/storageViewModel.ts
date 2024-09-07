import { StorageEntity } from "../domain/storageEntity";

export default class StorageViewModel implements StorageEntity {
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
}
