export default abstract class CommodityCategory {
    static readonly electronicProducts = "electronicProducts";
    static readonly furniture = "furniture";
    static readonly clothingAndAccessories = "clothingAndAccessories";
    static readonly booksAndMedia = "booksAndMedia";
    static readonly homeAppliances = "homeAppliances";
    static readonly sportsAndFitnessEquipment = "sportsAndFitnessEquipment";
    static readonly carsAndVehicles = "carsAndVehicles";
    static readonly musicalInstruments = "musicalInstruments";
    static readonly toolsAndEquipment = "toolsAndEquipment";
    static readonly toysAndGames = "toysAndGames";
    static readonly collectibles = "collectibles";
    static readonly beautyAndPersonalCareProducts = "beautyAndPersonalCareProducts";
    static readonly kitchenUtensils = "kitchenUtensils";
    static readonly officeEquipment = "officeEquipment";
    static readonly photographicEquipment = "photographicEquipment";
    static readonly babyAndChildProducts = "babyAndChildProducts";
    static readonly gardeningAndOutdoorSupplies = "gardeningAndOutdoorSupplies";
    static readonly petSupplies = "petSupplies";
    static readonly artwork = "artwork";
    static readonly jewelryAndWatches = "jewelryAndWatches";

    static get values() {
        return [
            this.electronicProducts,
            this.furniture,
            this.clothingAndAccessories,
            this.booksAndMedia,
            this.homeAppliances,
            this.sportsAndFitnessEquipment,
            this.carsAndVehicles,
            this.musicalInstruments,
            this.toolsAndEquipment,
            this.toysAndGames,
            this.collectibles,
            this.beautyAndPersonalCareProducts,
            this.kitchenUtensils,
            this.officeEquipment,
            this.photographicEquipment,
            this.babyAndChildProducts,
            this.gardeningAndOutdoorSupplies,
            this.petSupplies,
            this.artwork,
            this.jewelryAndWatches,
        ];
    }
}
