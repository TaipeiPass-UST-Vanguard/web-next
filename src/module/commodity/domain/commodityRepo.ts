import CommodityEntity from "./commodityEntity";

export type CommodityQueryParams = {
    location?: [number, number];
    keyword?: string;
    storageGroupId?: number;
    status?: string;
    giverId?: string;
    receiverId?: string;
};

export type CommodityCreateParams = {
    category: string;
    condition: string;
    description: string;
    name: string;
    giverId: string;
    storageGroupId: number;
    images: number[];
};

export default interface CommodityRepo {
    query({}: CommodityQueryParams): Promise<CommodityEntity[]>;

    get(id: number): Promise<CommodityEntity>;

    create({}: CommodityCreateParams): Promise<CommodityEntity>;

    update(id: number, params: Partial<CommodityEntity>): Promise<void>;

    delete(id: number): Promise<void>;
}
