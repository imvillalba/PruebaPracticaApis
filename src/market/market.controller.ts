import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketDto } from './market.dto';
import { MarketEntity } from './market.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('markets')
export class MarketController {

    constructor(
        private marketService: MarketService
    ) {}

    @Get()
    findAll() {
        return this.marketService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id: string) {
        return this.marketService.findOne(id);
    }

    @Post()
    create(@Body() marketDto: MarketDto) {
        const market: MarketEntity = plainToInstance(MarketEntity, marketDto);
        return this.marketService.create(market);
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() marketDto: MarketDto) {
        const market: MarketEntity = plainToInstance(MarketEntity, marketDto);
        return this.marketService.update({...market, id});
    }
    
    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.marketService.delete(id);
    }
}
