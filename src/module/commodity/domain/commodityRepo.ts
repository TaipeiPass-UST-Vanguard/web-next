import CommodityEntity from "./commodityEntity";

export type CommodityQueryParams = {
    location?: [number, number];
    keyword?: string;
    storageGroupId?: number;
};

export default interface CommodityRepo {
    query({}: CommodityQueryParams): Promise<CommodityEntity[]>;
}
