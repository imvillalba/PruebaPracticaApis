import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { MarketModule } from './market/market.module';
import { CityMarketModule } from './city-market/city-market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city/city.entity';
import { MarketEntity } from './market/market.entity';

@Module({
  imports: [
    CityModule, 
    MarketModule, 
    CityMarketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        CityEntity,
        MarketEntity
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
