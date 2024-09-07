import StorageGroupEntity from "../domain/storageGroupEntity";

export default class StorageGroupViewModel implements StorageGroupEntity {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: StorageGroupEntity) {
        this.id = entity.id;
        this.name = entity.name;
        this.longitude = entity.longitude;
        this.latitude = entity.latitude;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }
}
