export default abstract class CommodityCondition {
    static readonly brandNewUnused = "brandNewUnused";
    static readonly likeNew = "likeNew";
    static readonly eightyPercentNew = "eightyPercentNew";
    static readonly seventyPercentNew = "seventyPercentNew";
    static readonly normalUse = "normalUse";
    static readonly slightlyWorn = "slightlyWorn";
    static readonly obviousSignsOfUse = "obviousSignsOfUse";
    static readonly functionsNormallyButPoorAppearance = "functionsNormallyButPoorAppearance";
    static readonly needsRepair = "needsRepair";
    static readonly forPartsOnly = "forPartsOnly";

    static get values() {
        return [
            this.brandNewUnused,
            this.likeNew,
            this.eightyPercentNew,
            this.seventyPercentNew,
            this.normalUse,
            this.slightlyWorn,
            this.obviousSignsOfUse,
            this.functionsNormallyButPoorAppearance,
            this.needsRepair,
            this.forPartsOnly,
        ];
    }
}
