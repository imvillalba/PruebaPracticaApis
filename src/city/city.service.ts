import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>
    ) {}

    findAll() {
        return this.cityRepository.find({relations: ['markets']});
    }

    async findOne(id: string): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({where: {id}, relations: ['markets']});
        if (!city) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }
        return city;
    }

    async create(city: CityEntity): Promise<CityEntity> {
        if (!["argentina", "ecuador", "paraguay"].includes(city.country?.toLowerCase())) {
            throw new BusinessLogicException("La ciudad debe pertenecer a Argentina, Ecuador o Paraguay", BusinessError.PRECONDITION_FAILED);
        }
        return await this.cityRepository.save(city);
    }

    async update(city: CityEntity): Promise<CityEntity> {
        const cityFound = await this.cityRepository.findOne({where: {id: city.id}});
        if (!cityFound) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }

        if (!["argentina", "ecuador", "paraguay"].includes(city.country?.toLowerCase())) {
            throw new BusinessLogicException("La ciudad debe pertenecer a Argentina, Ecuador o Paraguay", BusinessError.NOT_FOUND);
        }
        return await this.cityRepository.save(city);
    }

    async delete(id: string) {
        const cityFound = await this.cityRepository.findOne({where: {id}});
        if (!cityFound) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }
        return await this.cityRepository.remove(cityFound);
    }
}
