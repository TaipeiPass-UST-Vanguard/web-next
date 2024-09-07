import StorageGroupEntity from "../domain/storageGroupEntity";

export default class StorageGroupDto {
    id: number;
    name: string;
    lontitude: number;
    latitude: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: StorageGroupEntity) {
        this.id = entity.id;
        this.name = entity.name;
        this.lontitude = entity.longitude;
        this.latitude = entity.latitude;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            lontitude: this.lontitude,
            latitude: this.latitude,
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
            createdTime: new Date(json.createdTime),
            updatedTime: new Date(json.updatedTime),
        };
    }
}
