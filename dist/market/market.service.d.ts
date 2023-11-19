import { MarketEntity } from './market.entity';
import { Repository } from 'typeorm';
export declare class MarketService {
    private readonly marketRepository;
    constructor(marketRepository: Repository<MarketEntity>);
    findAll(): Promise<MarketEntity[]>;
    findOne(id: string): Promise<MarketEntity>;
    validateMarketName: (name: string) => void;
    create(market: MarketEntity): Promise<MarketEntity>;
    update(market: MarketEntity): Promise<MarketEntity>;
    delete(id: string): Promise<MarketEntity>;
}
