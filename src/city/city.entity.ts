import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MarketEntity } from "../market/market.entity";

@Entity()
export class CityEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    population: number;

    @OneToMany(() => MarketEntity, (market) => market.city)
    markets: MarketEntity[];
}
