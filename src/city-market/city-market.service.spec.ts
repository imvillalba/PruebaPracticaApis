import { Test, TestingModule } from '@nestjs/testing';
import { CityMarketService } from './city-market.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { CityEntity } from '../city/city.entity';
import { MarketEntity } from '../market/market.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CityMarketService', () => {
  let service: CityMarketService;
  let cities = [];
  let markets = [];
  let cityRepository: Repository<CityEntity>;
  let marketRepository: Repository<MarketEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityMarketService],
    }).compile();

    service = module.get<CityMarketService>(CityMarketService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
    marketRepository = module.get<Repository<MarketEntity>>(
      getRepositoryToken(MarketEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    cityRepository.clear();
    marketRepository.clear();

    cities = [];
    for (let i = 0; i < 5; i++) {
      const ciudad: CityEntity = await cityRepository.save({
        name: "City 1",
        country: "Argentina",
        population: 1000,
        markets: []
      });
      cities.push(ciudad);
    }
    markets = [];
    for (let i = 0; i < 5; i++) {
      const market: MarketEntity = await marketRepository.save({
        name: 'Market con nombre',
        latitude: 2,
        longitude: 1,
        webPage: 'https'
      });
      markets.push(market);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not be able to add a supermarket to a city if city does not exists', async () => {
    try {
      const add = await service.addSupermarketToCity('123', '431');
      expect(add).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should not be able to add a supermarket to a city if supermarket does not exists', async () => {
    try {
      const add = await service.addSupermarketToCity(cities[0].id, '431');
      expect(add).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "El supermercado no fue encontrado");
    }
  });

  it('should be able to add supermarket to a city', async () => {
    const add = await service.addSupermarketToCity(cities[0].id, markets[0].id);
    expect(add.markets).toHaveLength(1);
  });

  it('should not be able to find supermarkets from city if city does not exist', async () => {
    try {
      const markets = await service.findSupermarketsFromCity("123");
      expect(markets).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should be able to find supermarkets from city', async () => {
    const supermarkets =  await service.findSupermarketsFromCity(cities[0].id);
    expect(supermarkets).toHaveLength(0);
  });

  it('should not be able to find supermarket from city if city does not exist', async () => {
    try {
      const marketFound = await service.findSupermarketFromCity("123", markets[0].id);
      expect(marketFound).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should not be able to find supermarket from city if supermarket does not exist', async () => {
    try {
      const marketFound = await service.findSupermarketFromCity(cities[0].id, "123");
      expect(marketFound).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "El supermercado no fue encontrado");
    }
  });

  it('should be able to find a supermarket from a city', async () => {
    await service.addSupermarketToCity(cities[0].id, markets[0].id);
    const market = await service.findSupermarketFromCity(cities[0].id, markets[0].id);
    expect(market.id).toEqual(markets[0].id);
  });

  it('should not be able to update a supermarket from a city if city does not exists', async () => {
    try {
      const addition = await service.updateSupermarketsFromCity("1232", []);
      expect(addition).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should not be able to update a supermarket from a city if market does not exists', async () => {
    try {
      const addition = await service.updateSupermarketsFromCity(cities[0].id, ["123"]);
      expect(addition).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "El supermercado no fue encontrado");
    }
  });

  it('should be able to update supermarkets from a city', async () => {
    const city = await service.updateSupermarketsFromCity(cities[0].id, [markets[0].id]);
    expect(city.markets).toHaveLength(1);
  });

  it('should not be able to delete a supermarket from a city if city does not exists', async () => {
    try {
      const addition = await service.deleteSupermarketFromCity("1232", markets[0].id);
      expect(addition).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should not be able to delete a supermarket from a city if supermarket is not associated', async () => {
    try {
      const addition = await service.deleteSupermarketFromCity(cities[0].id, markets[0].id);
      expect(addition).toBeNull();
    } catch (err) {
      expect(err).toHaveProperty("message", "El supermercado no se encuentra asociado");
    }
  });

  it('should be able to delete a supermarket from a city', async () => {
    await service.addSupermarketToCity(cities[0].id, markets[0].id);
    const city = await service.deleteSupermarketFromCity(cities[0].id, markets[0].id);
    expect(city.markets).toHaveLength(0);
  });
});
