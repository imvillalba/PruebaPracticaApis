import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketEntity } from './market.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class MarketService {

    constructor(
        @InjectRepository(MarketEntity) private readonly marketRepository: Repository<MarketEntity>
    ) {}

    findAll() {
        return this.marketRepository.find({relations: ['city']});
    }

    async findOne(id: string): Promise<MarketEntity> {
        const market = await this.marketRepository.findOne({where: {id}, relations: ['city']});
        if (!market) {
            throw new BusinessLogicException("El supermercado no fue encontrado", BusinessError.NOT_FOUND);
        }
        return market;
    }

    validateMarketName = (name: string) => {
        if (name.length <= 10) {
            throw new BusinessLogicException("El nombre del supermercado debe tener más de 10 caracteres", BusinessError.PRECONDITION_FAILED);
        }
    }

    async create(market: MarketEntity): Promise<MarketEntity> {
        this.validateMarketName(market.name);
        return await this.marketRepository.save(market);
    }

    async update(market: MarketEntity): Promise<MarketEntity> {
        this.validateMarketName(market.name);
        const marketFound = await this.marketRepository.findOne({where: {id: market.id}});
        if (!marketFound) {
            throw new BusinessLogicException("El supermercado no fue encontrado", BusinessError.NOT_FOUND);
        }

        return await this.marketRepository.save(market);
    }

    async delete(id: string) {
        const marketFound = await this.marketRepository.findOne({where: {id}});
        if (!marketFound) {
            throw new BusinessLogicException("El supermercado no fue encontrado", BusinessError.NOT_FOUND);
        }
        return await this.marketRepository.remove(marketFound);
    }
}
