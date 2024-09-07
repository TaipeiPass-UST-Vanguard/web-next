import CommodityCategory from "../domain/commodityCategory";
import CommodityCondition from "../domain/commodityCondition";
import CommodityStatus from "../domain/commodityStatus";

export function commodityStatusString(status: string): string {
    switch (status) {
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
        case CommodityStatus.finished:
            return "已完成";
        default:
            return "UNKNOWN";
    }
}

export function commodityCategoryString(category: string): string {
    switch (category) {
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

export function commodityConditionString(condition: string): string {
    switch (condition) {
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