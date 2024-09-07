import StorageGroupEntity from "../domain/storageGroupEntity";

export default class StorageGroupDto implements StorageGroupEntity {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    available: number;
    total: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: StorageGroupEntity) {
        this.id = entity.id;
        this.name = entity.name;
        this.longitude = entity.longitude;
        this.latitude = entity.latitude;
        this.available = entity.available;
        this.total = entity.total;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            lontitude: this.longitude,
            latitude: this.latitude,
            available: this.available,
            total: this.total,
            createdTime: this.createdTime.toISOString(),
            updatedTime: this.updatedTime.toISOString(),
        };
    }

    static fromJson(json: any): StorageGroupEntity {
        return {
            id: json.id,
            name: json.name,
            longitude: json.longitude,
            latitude: json.latitude,
            available: json.available,
            total: json.total,
            createdTime: new Date(json.createdTime),
            updatedTime: new Date(json.updatedTime),
        };
    }
}
