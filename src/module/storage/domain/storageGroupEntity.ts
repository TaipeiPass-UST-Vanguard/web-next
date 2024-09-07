export default interface StorageGroupEntity {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    available: number;
    total: number;
    createdTime: Date;
    updatedTime: Date;
}
