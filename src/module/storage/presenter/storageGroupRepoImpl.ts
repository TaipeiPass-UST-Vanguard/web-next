import axios from "axios";
import StorageGroupEntity from "../domain/storageGroupEntity";
import StorageGroupRepo from "../domain/storageGroupRepo";
import { BACKEND_URL } from "@/config/config";
import StorageGroupDto from "../application/storageGroupDto";

export default class StorageGroupRepoImpl implements StorageGroupRepo {
    async query(): Promise<StorageGroupEntity[]> {
        const response = await axios.get(new URL("/api/storage/storage_group", BACKEND_URL).href);

        if (response.status !== 200)
            return Promise.reject(response);

        return (response.data["data"] as any[]).map(StorageGroupDto.fromJson)
    }

    async get(id: number): Promise<StorageGroupEntity> {
        const response = await axios.get(new URL(`/api/storage/storage_group/${id}`, BACKEND_URL).href);

        if (response.status !== 200)
            return Promise.reject(response);

        return StorageGroupDto.fromJson(response.data["data"]);
    }
}
