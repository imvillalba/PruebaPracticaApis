import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '../city/city.entity';
import { MarketEntity } from '../market/market.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class CityMarketService {

    constructor(
        @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
        @InjectRepository(MarketEntity) private readonly marketRepository: Repository<MarketEntity>
    ) {}

     async addSupermarketToCity(cityId: string, marketId: string) {
        const city = await this.cityRepository.findOne({where: {id: cityId}, relations: ['markets']});
        if (!city) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }
        const market = await this.marketRepository.findOne({where: {id: marketId}, relations: ['city']});
        if (!market) {
            throw new BusinessLogicException("El supermercado no fue encontrado", BusinessError.NOT_FOUND);
        }
        city.markets.push(market);
        return await this.cityRepository.save(city);
    }

    async findSupermarketsFromCity(cityId: string) {
        const city = await this.cityRepository.findOne({where: {id: cityId}, relations: ['markets']});
        if (!city) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }

        return city.markets;
    }

    async findSupermarketFromCity(cityId: string, marketId: string) {
        const city = await this.cityRepository.findOne({where: {id: cityId}, relations: ['markets']});
        if (!city) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }

        const requiredMarket = city.markets.find((market) => market.id === marketId);
        if (!requiredMarket) {
            throw new BusinessLogicException("El supermercado no fue encontrado", BusinessError.NOT_FOUND);
        }

        return requiredMarket;
    }

    async updateSupermarketsFromCity(cityId: string, markets: Array<string>) {
        const city = await this.cityRepository.findOne({where: {id: cityId}, relations: ['markets']});
        if (!city) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }

        const marketsFound = [];
        for (let x = 0; x < markets.length; x++) {
            const marketFound = await this.marketRepository.findOne({where: {id: markets[x]}});
            if (!marketFound) {
                throw new BusinessLogicException("El supermercado no fue encontrado", BusinessError.NOT_FOUND);
            }
            marketsFound.push(marketFound);
        }
        city.markets = marketsFound;
        return await this.cityRepository.save(city);
    }

    async deleteSupermarketFromCity(cityId: string, marketId: string) {
        const city = await this.cityRepository.findOne({where: {id: cityId}, relations: ['markets']});
        if (!city) {
            throw new BusinessLogicException("La ciudad no fue encontrada", BusinessError.NOT_FOUND);
        }
        const isMarketAssociated = city.markets.find((market) => market.id === marketId);
        if (!isMarketAssociated) {
            throw new BusinessLogicException("El supermercado no se encuentra asociado", BusinessError.NOT_FOUND);
        }

        city.markets = city.markets.filter((market) => market.id !== marketId);
        return await this.cityRepository.save(city);
    }
}
