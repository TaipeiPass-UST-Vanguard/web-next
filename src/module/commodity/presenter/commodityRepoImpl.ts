import axios from "axios";
import CommodityEntity from "../domain/commodityEntity";
import CommodityRepo, { CommodityCreateParams, CommodityQueryParams } from "../domain/commodityRepo";
import { BACKEND_URL } from "@/config/config";
import CommodityDto from "../application/commodityDto";

export default class CommodityRepoImpl implements CommodityRepo {
    async query({
        location,
        keyword,
        storageGroupId,
        status,
        giverId,
        receiverId,
    }: CommodityQueryParams): Promise<CommodityEntity[]> {
        const params: any = {};
        if (location !== undefined) {
            params.latitude = location[0];
            params.longitude= location[1];
        }
        if (keyword !== undefined) params.keyword = keyword;
        if (storageGroupId !== undefined) params.storageGroupId = storageGroupId;
        if (status !== undefined) params.status = status;
        if (giverId !== undefined) params.giverId = giverId;
        if (receiverId !== undefined) params.receiverId = receiverId;

        const response = await axios.get(new URL("/api/commodity/commodity", BACKEND_URL).href, {
            params: params,
        });

        if (response.status !== 200)
            return Promise.reject(response);

        return (response.data["data"] as any[]).map((item) => CommodityDto.fromJson(item));
    }

    async get(id: number): Promise<CommodityEntity> {
        const response = await axios.get(new URL(`/api/commodity/commodity/${id}`, BACKEND_URL).href);

        if (response.status !== 200) return Promise.reject(response);

        return CommodityDto.fromJson(response.data["data"]);
    }

    async create(params: CommodityCreateParams): Promise<CommodityEntity> {
        const response = await axios.post(new URL("/api/commodity/commodity", BACKEND_URL).href, params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status !== 201) return Promise.reject(response);

        return CommodityDto.fromJson(response.data["data"]);
    }

    async update(id: number, params: Partial<CommodityEntity>): Promise<CommodityEntity> {
        const response = await axios.patch(new URL(`/api/commodity/commodity/${id}`, BACKEND_URL).href, params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status!== 204) return Promise.reject(response);

        return CommodityDto.fromJson(response.data["data"]);
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/commodity/commodity/${id}`, BACKEND_URL).href);

        if (response.status!== 204) return Promise.reject(response);
    }
}
