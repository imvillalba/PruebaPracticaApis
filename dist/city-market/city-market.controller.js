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
exports.CityMarketController = void 0;
const common_1 = require("@nestjs/common");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors/business-errors.interceptor");
const city_market_service_1 = require("./city-market.service");
let CityMarketController = class CityMarketController {
    constructor(cityMarketRepository) {
        this.cityMarketRepository = cityMarketRepository;
    }
    addSupermarketToCity(cityId, marketId) {
        return this.cityMarketRepository.addSupermarketToCity(cityId, marketId);
    }
    findSupermarketsFromCity(cityId) {
        return this.cityMarketRepository.findSupermarketsFromCity(cityId);
    }
    findSupermarketFromCity(cityId, marketId) {
        return this.cityMarketRepository.findSupermarketFromCity(cityId, marketId);
    }
    updateSupermarketsFromCity(cityId, body) {
        return this.cityMarketRepository.updateSupermarketsFromCity(cityId, body.markets);
    }
    deleteSupermarketFromCity(cityId, marketId) {
        return this.cityMarketRepository.deleteSupermarketFromCity(cityId, marketId);
    }
};
exports.CityMarketController = CityMarketController;
__decorate([
    (0, common_1.Post)(':cityId/supermarkets/:marketId'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('marketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CityMarketController.prototype, "addSupermarketToCity", null);
__decorate([
    (0, common_1.Get)(':cityId/supermarkets'),
    __param(0, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CityMarketController.prototype, "findSupermarketsFromCity", null);
__decorate([
    (0, common_1.Get)(':cityId/supermarkets/:marketId'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('marketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CityMarketController.prototype, "findSupermarketFromCity", null);
__decorate([
    (0, common_1.Put)(':cityId/supermarkets/'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CityMarketController.prototype, "updateSupermarketsFromCity", null);
__decorate([
    (0, common_1.Delete)(':cityId/supermarkets/:marketId'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('marketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CityMarketController.prototype, "deleteSupermarketFromCity", null);
exports.CityMarketController = CityMarketController = __decorate([
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    (0, common_1.Controller)('cities'),
    __metadata("design:paramtypes", [city_market_service_1.CityMarketService])
], CityMarketController);
//# sourceMappingURL=city-market.controller.js.map