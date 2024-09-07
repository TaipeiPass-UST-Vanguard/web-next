import RewardEntity from "../domain/rewardEntity";
import RewardRepo from "../domain/rewardRepo";

export default class RewardUsecase {
    private _repo: RewardRepo;

    constructor(repo: RewardRepo) {
        this._repo = repo;
    }

    async getUserReward(userId: string): Promise<RewardEntity> {
        return this._repo.get(userId);
    }

    async createReward(params: {
        userId: string;
        reward: number;
        commodityId: number;
    }): Promise<void> {
        return this._repo.create({
            ...params,
            role: "giver",
            reason: "rating",
        });
    }
}
