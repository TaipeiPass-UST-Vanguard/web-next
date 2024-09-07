import axios from "axios";
import CommodityEntity from "../domain/commodityEntity";
import CommodityRepo, { CommodityQueryParams } from "../domain/commodityRepo";
import { BACKEND_URL } from "@/config/config";
import CommodityDto from "../application/commodityDto";

export default class CommodityRepoImpl implements CommodityRepo {
    async query({
        location,
        keyword,
        storageGroupId,
    }: CommodityQueryParams): Promise<CommodityEntity[]> {
        const params: any = {};
        if (location !== undefined) {
            params.lat = location[0];
            params.lng = location[1];
        }
        if (keyword !== undefined) params.keyword = keyword;
        if (storageGroupId!== undefined) params.storageGroupId = storageGroupId;

        const response = await axios.get(new URL("/api/commodity/commodity", BACKEND_URL).href, {
            params: params,
        });

        if (response.status !== 200)
            return Promise.reject(response);

        return response.data.map((item: any) => CommodityDto.fromJson(item));
    }
}
