export interface StorageEntity {
    id: number;
    groupId: number;
    commodityId: number | undefined;
    createdTime: Date;
    updatedTime: Date;
}
