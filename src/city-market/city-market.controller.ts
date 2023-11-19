import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { CityMarketService } from './city-market.service';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('cities')
export class CityMarketController {

    constructor(
        private cityMarketRepository: CityMarketService
    ) {}

    @Post(':cityId/supermarkets/:marketId')
    addSupermarketToCity(@Param('cityId') cityId: string, @Param('marketId') marketId: string) {
        return this.cityMarketRepository.addSupermarketToCity(cityId, marketId);
    }

    @Get(':cityId/supermarkets')
    findSupermarketsFromCity(@Param('cityId') cityId: string) {
        return this.cityMarketRepository.findSupermarketsFromCity(cityId);
    }

    @Get(':cityId/supermarkets/:marketId')
    findSupermarketFromCity(@Param('cityId') cityId: string, @Param('marketId') marketId: string) {
        return this.cityMarketRepository.findSupermarketFromCity(cityId, marketId);
    }

    @Put(':cityId/supermarkets/')
    updateSupermarketsFromCity(@Param('cityId') cityId: string, @Body() body: any) {
        return this.cityMarketRepository.updateSupermarketsFromCity(cityId, body.markets);
    }

    @Delete(':cityId/supermarkets/:marketId') 
    deleteSupermarketFromCity(@Param('cityId') cityId: string, @Param('marketId') marketId: string) {
        return this.cityMarketRepository.deleteSupermarketFromCity(cityId, marketId);
    }
}
