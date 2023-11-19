import { CityMarketService } from './city-market.service';
export declare class CityMarketController {
    private cityMarketRepository;
    constructor(cityMarketRepository: CityMarketService);
    addSupermarketToCity(cityId: string, marketId: string): Promise<import("../city/city.entity").CityEntity>;
    findSupermarketsFromCity(cityId: string): Promise<import("../market/market.entity").MarketEntity[]>;
    findSupermarketFromCity(cityId: string, marketId: string): Promise<import("../market/market.entity").MarketEntity>;
    updateSupermarketsFromCity(cityId: string, body: any): Promise<import("../city/city.entity").CityEntity>;
    deleteSupermarketFromCity(cityId: string, marketId: string): Promise<import("../city/city.entity").CityEntity>;
}
