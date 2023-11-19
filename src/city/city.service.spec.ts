import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { CityEntity } from './city.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('City Service', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;
  let cities: CityEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    cities = [];
    for (let i = 0; i < 5; i++) {
      const ciudad: CityEntity = await repository.save({
        name: faker.location.city(),
        country: "Argentina",
        population: 1000,
        markets: []
      });
      cities.push(ciudad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not be able to create a city if it belongs to Colombia', async () => {
    try {
      const newCity = {
        name: "Bogotá",
        country: "Colombia",
        population: 8000000,
        markets: []
      } as CityEntity;
      const creation = await service.create(newCity);
      expect(creation).toBeNull();
    } catch(error) {
      expect(error).toHaveProperty("message", "La ciudad debe pertenecer a Argentina, Ecuador o Paraguay")
    }
  });

  it('should be able to create a city if it belongs to Argentina', async () => {
    try {
      const newCity = {
        name: "Buenos Aires",
        country: "Argentina",
        population: 3000000,
        markets: []
      } as CityEntity;
      const creation = await service.create(newCity);
      expect(creation).toEqual(newCity);
    } catch(error) {
      expect(error).toBeNull();
    }
  });

  it('should be able to retrieve all cities', async () => {
    const citiesFound: CityEntity[] = await service.findAll();
    expect(citiesFound).not.toBeNull();
    expect(citiesFound).toHaveLength(cities.length);
  });

  it('should be able to find a city by id', async () => {
    const [ requiredCity ] = cities;
    const foundCity: CityEntity = await service.findOne(requiredCity.id);
    expect(foundCity).not.toBeNull();
    expect(foundCity.name).toEqual(requiredCity.name);
  });


  it('should not be able to find a city if it does not exist', async () => {
    try {
      const foundCity: CityEntity = await service.findOne("987654345");
      expect(foundCity).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should be able to update a city', async () => {
    const [ cityToUpdate ] = cities;
    const updatedCity: CityEntity = await service.update({...cityToUpdate, name: "An updated city"});
    expect(updatedCity.name).toEqual("An updated city");
  });


  it('should not be able to update a city if it does not exist', async () => {
    try {
      const [ cityToUpdate ] = cities;
      const foundCity: CityEntity = await service.update({...cityToUpdate, id: "9876543"});
      expect(foundCity).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should not be able to delete a city if it does not exist', async () => {
    try {
      const foundCity: CityEntity = await service.delete("9876543");
      expect(foundCity).toBeNull();
    } catch (error) {
      expect(error).toHaveProperty("message", "La ciudad no fue encontrada");
    }
  });

  it('should be able to find a city by id', async () => {
    const [ cityToDelete ] = cities;
    const deletedCity = await service.delete(cityToDelete.id);
    expect(deletedCity.id).toBeUndefined();
  });
});
