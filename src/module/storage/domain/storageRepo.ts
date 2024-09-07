import { StorageEntity } from "./storageEntity";

export default interface StorageRepo {
    query(storageGroupId?: number): Promise<StorageEntity[]>;
}
