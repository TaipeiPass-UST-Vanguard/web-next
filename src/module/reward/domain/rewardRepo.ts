import RewardEntity from "./rewardEntity";

export type RewardCreateParams = {
    commodityId: number;
    userId: string;
    reward: number;
    reason?: string;
    role?: string;
};

export default interface RewardRepo {
    get(userId: string): Promise<RewardEntity>;
    
    create(params: RewardCreateParams): Promise<void>;
}
