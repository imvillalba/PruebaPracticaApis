"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const city_entity_1 = require("../../city/city.entity");
const market_entity_1 = require("../../market/market.entity");
const TypeOrmTestingConfig = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [
            city_entity_1.CityEntity,
            market_entity_1.MarketEntity
        ],
        dropSchema: true,
        synchronize: true,
        keepConnectionAlive: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([
        city_entity_1.CityEntity,
        market_entity_1.MarketEntity
    ]),
];
exports.TypeOrmTestingConfig = TypeOrmTestingConfig;
//# sourceMappingURL=typeorm-testing-config.js.map