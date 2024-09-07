import CommodityEntity from "../domain/commodityEntity";
import CommodityRepo, { CommodityQueryParams } from "../domain/commodityRepo";

export default class CommodityUsecase {
    private _repo: CommodityRepo;

    constructor(repo: CommodityRepo) {
        this._repo = repo;
    }

    async getAllCommodity(params: CommodityQueryParams): Promise<CommodityEntity[]> {
        return this._repo.query(params);
    }
}
