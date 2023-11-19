import { MarketService } from './market.service';
import { MarketDto } from './market.dto';
import { MarketEntity } from './market.entity';
export declare class MarketController {
    private marketService;
    constructor(marketService: MarketService);
    findAll(): Promise<MarketEntity[]>;
    findOne(id: string): Promise<MarketEntity>;
    create(marketDto: MarketDto): Promise<MarketEntity>;
    update(id: string, marketDto: MarketDto): Promise<MarketEntity>;
    delete(id: string): Promise<MarketEntity>;
}
