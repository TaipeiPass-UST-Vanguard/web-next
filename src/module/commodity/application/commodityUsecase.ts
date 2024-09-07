import CommodityEntity from "../domain/commodityEntity";
import CommodityRepo, { CommodityCreateParams, CommodityQueryParams } from "../domain/commodityRepo";

export default class CommodityUsecase {
    private _repo: CommodityRepo;

    constructor(repo: CommodityRepo) {
        this._repo = repo;
    }

    async getAllCommodity(params: CommodityQueryParams): Promise<CommodityEntity[]> {
        return this._repo.query(params);
    }

    async getCommodityById(id: number): Promise<CommodityEntity> {
        return this._repo.get(id);
    }

    async createCommodity(params: CommodityCreateParams): Promise<CommodityEntity> {
        return this._repo.create(params);
    }

    async deleteCommodity(id: number): Promise<void> {
        await this._repo.delete(id);
    }
}
