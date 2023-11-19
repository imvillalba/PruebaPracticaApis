import { CityEntity } from './city.entity';
import { Repository } from 'typeorm';
export declare class CityService {
    private readonly cityRepository;
    constructor(cityRepository: Repository<CityEntity>);
    findAll(): Promise<CityEntity[]>;
    findOne(id: string): Promise<CityEntity>;
    create(city: CityEntity): Promise<CityEntity>;
    update(city: CityEntity): Promise<CityEntity>;
    delete(id: string): Promise<CityEntity>;
}
