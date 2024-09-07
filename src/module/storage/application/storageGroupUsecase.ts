import StorageGroupEntity from "../domain/storageGroupEntity";
import StorageGroupRepo from "../domain/storageGroupRepo";

export default class StorageGroupUsecase {
    private _repo: StorageGroupRepo;

    constructor(repo: StorageGroupRepo) {
        this._repo = repo;
    }

    async getAllStorageGroup(): Promise<StorageGroupEntity[]> {
        return this._repo.query();
    }

    async getStorageGroup(id: number): Promise<StorageGroupEntity> {
        return this._repo.get(id);
    }
}
