import axios from "axios";
import RewardEntity from "../domain/rewardEntity";
import RewardRepo, { RewardCreateParams } from "../domain/rewardRepo";
import { BACKEND_URL } from "@/config/config";

export default class RewardRepoImpl implements RewardRepo {
    async get(userId: string): Promise<RewardEntity> {
        const response = await axios.get(new URL(`/api/record/record/${userId}`, BACKEND_URL).href);

        if (response.status !== 200)
            return Promise.reject(response);

        return response.data["data"] as RewardEntity;
    }

    async create(params: RewardCreateParams): Promise<void> {
        const response = await axios.post(new URL("/api/record/record", BACKEND_URL).href, params);

        if (response.status !== 201)
            return Promise.reject(response);
    }
}
