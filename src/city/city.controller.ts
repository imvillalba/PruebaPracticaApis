import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './city.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { CityDto } from './city.dto';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('cities')
export class CityController {

    constructor(
        private cityService: CityService
    ) {}

    @Get()
    findAll() {
        return this.cityService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id: string) {
        return this.cityService.findOne(id);
    }

    @Post()
    create(@Body() cityDto: CityDto) {
        const city: CityEntity = plainToInstance(CityEntity, cityDto);
        return this.cityService.create(city);
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() cityDto: CityDto) {
        const city: CityEntity = plainToInstance(CityEntity, cityDto);
        return this.cityService.update({...city, id});
    }
    
    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.cityService.delete(id);
    }
}
