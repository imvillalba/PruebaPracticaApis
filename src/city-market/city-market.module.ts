import { Module } from '@nestjs/common';
import { CityMarketService } from './city-market.service';
import { CityMarketController } from './city-market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '../city/city.entity';
import { MarketEntity } from '../market/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), TypeOrmModule.forFeature([MarketEntity])],
  providers: [CityMarketService],
  controllers: [CityMarketController]
})
export class CityMarketModule {}
