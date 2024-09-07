import { StorageEntity } from "./storageEntity";

export default interface StorageRepo {
    query(groupId?: number): Promise<StorageEntity[]>;
}
