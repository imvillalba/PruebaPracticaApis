import { CityEntity } from "../city/city.entity";
export declare class MarketEntity {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    webPage: string;
    city: CityEntity;
}
