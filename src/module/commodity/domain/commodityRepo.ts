import CommodityEntity from "./commodityEntity";

export type CommodityQueryParams = {
    location?: [number, number];
    keyword?: string;
    storageGroupId?: number;
};

export type CommodityCreateParams = {
    category: string;
    condition: string;
    description: string;
    name: string;
    userId: string;
    storageGroupId?: number;
};

export default interface CommodityRepo {
    query({}: CommodityQueryParams): Promise<CommodityEntity[]>;

    get(id: number): Promise<CommodityEntity>;

    create({}: CommodityCreateParams): Promise<CommodityEntity>;

    update(id: number, params: Partial<CommodityEntity>): Promise<CommodityEntity>;

    delete(id: number): Promise<void>;
}
