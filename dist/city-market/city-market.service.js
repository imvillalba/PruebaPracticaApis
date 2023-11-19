"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityMarketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_entity_1 = require("../city/city.entity");
const market_entity_1 = require("../market/market.entity");
const business_errors_1 = require("../shared/errors/business-errors");
const typeorm_2 = require("typeorm");
let CityMarketService = class CityMarketService {
    constructor(cityRepository, marketRepository) {
        this.cityRepository = cityRepository;
        this.marketRepository = marketRepository;
    }
    async addSupermarketToCity(cityId, marketId) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['markets'] });
        if (!city) {
            throw new business_errors_1.BusinessLogicException("La ciudad no fue encontrada", business_errors_1.BusinessError.NOT_FOUND);
        }
        const market = await this.marketRepository.findOne({ where: { id: marketId }, relations: ['city'] });
        if (!market) {
            throw new business_errors_1.BusinessLogicException("El supermercado no fue encontrado", business_errors_1.BusinessError.NOT_FOUND);
        }
        city.markets.push(market);
        return await this.cityRepository.save(city);
    }
    async findSupermarketsFromCity(cityId) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['markets'] });
        if (!city) {
            throw new business_errors_1.BusinessLogicException("La ciudad no fue encontrada", business_errors_1.BusinessError.NOT_FOUND);
        }
        return city.markets;
    }
    async findSupermarketFromCity(cityId, marketId) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['markets'] });
        if (!city) {
            throw new business_errors_1.BusinessLogicException("La ciudad no fue encontrada", business_errors_1.BusinessError.NOT_FOUND);
        }
        const requiredMarket = city.markets.filter((market) => market.id === marketId);
        if (!requiredMarket) {
            throw new business_errors_1.BusinessLogicException("El supermercado no fue encontrado", business_errors_1.BusinessError.NOT_FOUND);
        }
        return requiredMarket;
    }
    async updateSupermarketsFromCity(cityId, markets) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['markets'] });
        if (!city) {
            throw new business_errors_1.BusinessLogicException("La ciudad no fue encontrada", business_errors_1.BusinessError.NOT_FOUND);
        }
        const marketsFound = [];
        for (let x = 0; x < markets.length; x++) {
            const marketFound = await this.marketRepository.findOne({ where: { id: markets[x] } });
            if (!marketFound) {
                throw new business_errors_1.BusinessLogicException("El supermercado no fue encontrado", business_errors_1.BusinessError.NOT_FOUND);
            }
            marketsFound.push(marketFound);
        }
        city.markets = marketsFound;
        return await this.cityRepository.save(city);
    }
    async deleteSupermarketFromCity(cityId, marketId) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['markets'] });
        if (!city) {
            throw new business_errors_1.BusinessLogicException("La ciudad no fue encontrada", business_errors_1.BusinessError.NOT_FOUND);
        }
        city.markets = city.markets.filter((market) => market.id !== marketId);
        return await this.cityRepository.save(city);
    }
};
exports.CityMarketService = CityMarketService;
exports.CityMarketService = CityMarketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.CityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(market_entity_1.MarketEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CityMarketService);
//# sourceMappingURL=city-market.service.js.map