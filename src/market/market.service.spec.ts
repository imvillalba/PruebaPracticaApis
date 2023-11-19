import { Test, TestingModule } from '@nestjs/testing';
import { MarketService } from './market.service';
import { MarketEntity } from './market.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('Market Service', () => {
  let service: MarketService;
  let repository: Repository<MarketEntity>;
  let markets: MarketEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MarketService],
    }).compile();

    service = module.get<MarketService>(MarketService);
    repository = module.get<Repository<MarketEntity>>(
      getRepositoryToken(MarketEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    markets = [];
    for (let i = 0; i < 5; i++) {
      const market: MarketEntity = await repository.save({
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

  it('should not be able to create a market if its name is less than 10 characters', async () => {
    try {
      const newMarket = {
        name: 'Market',
        latitude: 2,
        longitude: 1,
        webPage: 'https'
      } as MarketEntity;
      const creation = await service.create(newMarket);
      expect(creation).toBeNull();
    } catch(error) {
      expect(error).toHaveProperty("message", "El nombre del supermercado debe tener más de 10 caracteres");
    }
  });

  it('should be able to create a market', async () => {
    try {
      const newMarket = {
        name: 'Market con nombre',
        latitude: 2,
        longitude: 1,
        webPage: 'https'
      } as MarketEntity;
      const creation = await service.create(newMarket);
      expect(creation).toEqual(newMarket);
    } catch(error) {
      expect(error).toBeNull();
    }
  });

  it('should be able to retrieve all markets', async () => {
    const marketsFound: MarketEntity[] = await service.findAll();
    expect(marketsFound).not.toBeNull();
    expect(marketsFound).toHaveLength(markets.length);
  });

  it('should be able to find a market by id', async () => {
    const [ requiredMarket ] = markets;
    const foundMarket: MarketEntity = await service.findOne(requiredMarket.id);
    expect(foundMarket).not.toBeNull();
    expect(foundMarket.name).toEqual(requiredMarket.name);
  });

  it('should not be able to find a market if it does not exist', async () => {
    try {
      const foundMarket: MarketEntity = await service.findOne("987654345");
      expect(foundMarket).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "El supermercado no fue encontrado");
    }
  });

  it('should be able to update a market', async () => {
    const [ marketToUpdate ] = markets;
    const updatedMarket: MarketEntity = await service.update({...marketToUpdate, name: "An updated market"});
    expect(updatedMarket.name).toEqual("An updated market");
  });


  it('should not be able to update a market if it does not exist', async () => {
    try {
      const [ marketToUpdate ] = markets;
      const foundMarket: MarketEntity = await service.update({...marketToUpdate, id: "9876543"});
      expect(foundMarket).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "El supermercado no fue encontrado");
    }
  });

  it('should not be able to update a market if its name does not have at least 10 characters', async () => {
    try {
      const [ marketToUpdate ] = markets;
      const foundMarket: MarketEntity = await service.update({...marketToUpdate, name: "Market"});
      expect(foundMarket).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "El nombre del supermercado debe tener más de 10 caracteres");
    }
  });

  it('should not be able to delete a market if it does not exist', async () => {
    try {
      const foundMarket: MarketEntity = await service.delete("9876543");
      expect(foundMarket).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "El supermercado no fue encontrado");
    }
  });

  it('should be able to find a market by id', async () => {
    const [ marketToDelete ] = markets;
    const deletedMarket = await service.delete(marketToDelete.id);
    expect(deletedMarket.id).toBeUndefined();
  });
});
