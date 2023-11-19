import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '../../city/city.entity';
import { MarketEntity } from '../../market/market.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [
            CityEntity,
            MarketEntity
        ],
        dropSchema: true,
        synchronize: true,
        keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([
        CityEntity,
        MarketEntity
    ]),
];
