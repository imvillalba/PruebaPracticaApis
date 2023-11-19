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
exports.MarketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const market_entity_1 = require("./market.entity");
const typeorm_2 = require("typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
let MarketService = class MarketService {
    constructor(marketRepository) {
        this.marketRepository = marketRepository;
        this.validateMarketName = (name) => {
            if (name.length <= 10) {
                throw new business_errors_1.BusinessLogicException("El nombre del supermercado debe tener más de 10 caracteres", business_errors_1.BusinessError.PRECONDITION_FAILED);
            }
        };
    }
    findAll() {
        return this.marketRepository.find({ relations: ['city'] });
    }
    async findOne(id) {
        const market = await this.marketRepository.findOne({ where: { id }, relations: ['city'] });
        if (!market) {
            throw new business_errors_1.BusinessLogicException("El supermercado no fue encontrado", business_errors_1.BusinessError.NOT_FOUND);
        }
        return market;
    }
    async create(market) {
        this.validateMarketName(market.name);
        return await this.marketRepository.save(market);
    }
    async update(market) {
        this.validateMarketName(market.name);
        const marketFound = await this.marketRepository.findOne({ where: { id: market.id } });
        if (!marketFound) {
            throw new business_errors_1.BusinessLogicException("El supermercado no fue encontrado", business_errors_1.BusinessError.NOT_FOUND);
        }
        return await this.marketRepository.save(market);
    }
    async delete(id) {
        const marketFound = await this.marketRepository.findOne({ where: { id } });
        if (!marketFound) {
            throw new business_errors_1.BusinessLogicException("El supermercado no fue encontrado", business_errors_1.BusinessError.NOT_FOUND);
        }
        return await this.marketRepository.remove(marketFound);
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(market_entity_1.MarketEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MarketService);
//# sourceMappingURL=market.service.js.map