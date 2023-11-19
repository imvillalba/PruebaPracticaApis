import { CityService } from './city.service';
import { CityEntity } from './city.entity';
import { CityDto } from './city.dto';
export declare class CityController {
    private cityService;
    constructor(cityService: CityService);
    findAll(): Promise<CityEntity[]>;
    findOne(id: string): Promise<CityEntity>;
    create(cityDto: CityDto): Promise<CityEntity>;
    update(id: string, cityDto: CityDto): Promise<CityEntity>;
    delete(id: string): Promise<CityEntity>;
}
