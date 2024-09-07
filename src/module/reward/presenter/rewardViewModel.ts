import RewardEntity from "../domain/rewardEntity";

export default class RewardViewModel implements RewardEntity {
    evaluation: string;
    meanReward: number;
    recordNum: number;
    reportNum: number;
    userId: string;

    constructor(data: RewardEntity) {
        this.evaluation = data.evaluation;
        this.meanReward = data.meanReward;
        this.recordNum = data.recordNum;
        this.reportNum = data.reportNum;
        this.userId = data.userId;
    }
}
