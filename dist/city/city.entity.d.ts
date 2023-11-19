import { MarketEntity } from "../market/market.entity";
export declare class CityEntity {
    id: string;
    name: string;
    country: string;
    population: number;
    markets: MarketEntity[];
}
