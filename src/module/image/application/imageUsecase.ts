import ImageEntity from "../domain/imageEntity";
import ImageRepo from "../domain/imageRepo";

export default class ImageUsecase {
    private _repo: ImageRepo;

    constructor(repo: ImageRepo) {
        this._repo = repo;
    }

    async uploadImage(file: File, onProgress?: (progress: number) => void): Promise<ImageEntity> {
        return this._repo.upload(file, onProgress);
    }
}
