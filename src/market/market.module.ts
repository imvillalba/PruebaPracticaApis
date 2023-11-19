import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketEntity } from './market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketController } from './market.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity])],
  providers: [MarketService],
  controllers: [MarketController]
})
export class MarketModule {}
