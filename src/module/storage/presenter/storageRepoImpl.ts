import axios from "axios";
import { StorageEntity } from "../domain/storageEntity";
import StorageRepo from "../domain/storageRepo";
import { BACKEND_URL } from "@/config/config";
import StorageDto from "../application/storageDto";

export default class StorageRepoImpl implements StorageRepo {
    async query(storageGroupId?: number): Promise<StorageEntity[]> {
        const params: any = {};
        if (storageGroupId !== undefined) params.storageGroupId= storageGroupId;

        const response = await axios.get(new URL("/api/storage/storage", BACKEND_URL).href, {
            params: params,
        });

        if (response.status !== 200)
            return Promise.reject(response);

        return (response.data["data"] as any[]).map(StorageDto.fromJson);
    }
}
