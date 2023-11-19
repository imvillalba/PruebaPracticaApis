import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityEntity } from "../city/city.entity";

@Entity()
export class MarketEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    webPage: string;

    @ManyToOne(() => CityEntity, (city) => city.markets)
    city: CityEntity;
}
