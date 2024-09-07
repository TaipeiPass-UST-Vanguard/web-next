import RewardEntity from "../domain/rewardEntity";

export default class RewardDto implements RewardEntity {
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

    static fromJson(data: any): RewardEntity{
        return {
            evaluation: data.evaluation,
            meanReward: data.meanReward,
            recordNum: data.recordNum,
            reportNum: data.reportNum,
            userId: data.userId,
        };
    }
}
