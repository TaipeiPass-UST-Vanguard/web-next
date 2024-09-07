import { Duration } from "luxon";
import CommodityEntity from "../domain/commodityEntity";
import CommodityStatus from "../domain/commodityStatus";
import CommodityCategory from "../domain/commodityCategory";
import CommodityCondition from "../domain/commodityCondition";
import { format } from "date-fns";

export default class CommodityViewModel implements CommodityEntity {
    id: number;
    userId: string;
    storageGroupId: number;
    name: string;
    description: string;
    images: number[];
    status: string;
    category: string;
    condition: string;
    expireTime: Date;
    giveExpireSeconds: number;
    receiveExpireSeconds: number;
    createdTime: Date;
    updatedTime: Date;

    constructor(entity: CommodityEntity) {
        this.id = entity.id;
        this.userId = entity.userId;
        this.storageGroupId = entity.storageGroupId;
        this.name = entity.name;
        this.description = entity.description;
        this.images = entity.images;
        this.status = entity.status;
        this.category = entity.category;
        this.condition = entity.condition;
        this.expireTime = entity.expireTime;
        this.giveExpireSeconds = entity.giveExpireSeconds;
        this.receiveExpireSeconds = entity.receiveExpireSeconds;
        this.createdTime = entity.createdTime;
        this.updatedTime = entity.updatedTime;
    }

    get expireTimeString(): string {
        return format(this.expireTime, "yyyy-MM-dd");
    }

    get giveExpireDuration(): Duration {
        return Duration.fromMillis(this.giveExpireSeconds * 1000).rescale();
    }

    get receiveExpireDuration(): Duration {
        return Duration.fromMillis(this.receiveExpireSeconds * 1000).rescale();
    }

    get statusString(): string {
        switch (this.status) {
            case CommodityStatus.draft:
                return "草稿";
            case CommodityStatus.giving:
                return "放置貨品";
            case CommodityStatus.giveExpired:
                return "已過期";
            case CommodityStatus.pending:
                return "等待接收";
            case CommodityStatus.receiving:
                return "等待取貨";
            case CommodityStatus.expired:
                return "待清除";
            default:
                return "UNKNOWN";
        }
    }

    get categoryString(): string {
        switch (this.category) {
            case CommodityCategory.electronicProducts:
                return "電子產品";
            case CommodityCategory.furniture:
                return "家具";
            case CommodityCategory.clothingAndAccessories:
                return "衣物和配飾";
            case CommodityCategory.booksAndMedia:
                return "書籍和媒體";
            case CommodityCategory.homeAppliances:
                return "家用電器";
            case CommodityCategory.sportsAndFitnessEquipment:
                return "運動和健身器材";
            case CommodityCategory.carsAndVehicles:
                return "汽車和交通工具";
            case CommodityCategory.musicalInstruments:
                return "樂器";
            case CommodityCategory.toolsAndEquipment:
                return "工具和設備";
            case CommodityCategory.toysAndGames:
                return "玩具和遊戲";
            case CommodityCategory.collectibles:
                return "收藏品";
            case CommodityCategory.beautyAndPersonalCareProducts:
                return "美妝和個人護理產品";
            case CommodityCategory.kitchenUtensils:
                return "廚房用具";
            case CommodityCategory.officeEquipment:
                return "辦公設備";
            case CommodityCategory.photographicEquipment:
                return "攝影器材";
            case CommodityCategory.babyAndChildProducts:
                return "嬰兒和兒童用品";
            case CommodityCategory.gardeningAndOutdoorSupplies:
                return "園藝和戶外用品";
            case CommodityCategory.petSupplies:
                return "寵物用品";
            case CommodityCategory.artwork:
                return "藝術品";
            case CommodityCategory.jewelryAndWatches:
                return "珠寶和手錶";
            default:
                return "UNKNOWN";
        }
    }

    get conditionString(): string {
        switch (this.condition) {
            case CommodityCondition.brandNewUnused:
                return "全新未使用";
            case CommodityCondition.likeNew:
                return "九成新";
            case CommodityCondition.eightyPercentNew:
                return "八成新";
            case CommodityCondition.seventyPercentNew:
                return "七成新";
            case CommodityCondition.normalUse:
                return "使用正常";
            case CommodityCondition.slightlyWorn:
                return "輕微磨損";
            case CommodityCondition.obviousSignsOfUse:
                return "有明顯使用痕跡";
            case CommodityCondition.functionsNormallyButPoorAppearance:
                return "功能正常但外觀不佳";
            case CommodityCondition.needsRepair:
                return "需要維修";
            case CommodityCondition.forPartsOnly:
                return "僅供零件使用";
            default:
                return "UNKNOWN";
        }
    }
}
