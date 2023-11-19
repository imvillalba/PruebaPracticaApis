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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const city_entity_1 = require("./city.entity");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors/business-errors.interceptor");
const city_dto_1 = require("./city.dto");
const class_transformer_1 = require("class-transformer");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    findAll() {
        return this.cityService.findAll();
    }
    findOne(id) {
        return this.cityService.findOne(id);
    }
    create(cityDto) {
        const city = (0, class_transformer_1.plainToInstance)(city_entity_1.CityEntity, cityDto);
        return this.cityService.create(city);
    }
    update(id, cityDto) {
        const city = (0, class_transformer_1.plainToInstance)(city_entity_1.CityEntity, cityDto);
        return this.cityService.update({ ...city, id });
    }
    delete(id) {
        return this.cityService.delete(id);
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.CityDto]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, city_dto_1.CityDto]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "delete", null);
exports.CityController = CityController = __decorate([
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    (0, common_1.Controller)('cities'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map