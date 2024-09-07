import StorageGroupEntity from "./storageGroupEntity";

export default interface StorageGroupRepo {
    query(): Promise<StorageGroupEntity[]>;
}
