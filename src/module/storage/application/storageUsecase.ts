import { StorageEntity } from "../domain/storageEntity";
import StorageRepo from "../domain/storageRepo";

export default class StorageUsecase {
    private _repo: StorageRepo;

    constructor(repo: StorageRepo) {
        this._repo = repo;
    }

    async getAllStorage(groupId?: number): Promise<StorageEntity[]> {
        return await this._repo.query(groupId);
    }
}
