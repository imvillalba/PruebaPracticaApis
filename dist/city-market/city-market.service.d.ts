import { CityEntity } from 'src/city/city.entity';
import { MarketEntity } from 'src/market/market.entity';
import { Repository } from 'typeorm';
export declare class CityMarketService {
    private readonly cityRepository;
    private readonly marketRepository;
    constructor(cityRepository: Repository<CityEntity>, marketRepository: Repository<MarketEntity>);
    addSupermarketToCity(cityId: string, marketId: string): Promise<CityEntity>;
    findSupermarketsFromCity(cityId: string): Promise<MarketEntity[]>;
    findSupermarketFromCity(cityId: string, marketId: string): Promise<MarketEntity[]>;
    updateSupermarketsFromCity(cityId: string, markets: Array<string>): Promise<CityEntity>;
    deleteSupermarketFromCity(cityId: string, marketId: string): Promise<CityEntity>;
}
