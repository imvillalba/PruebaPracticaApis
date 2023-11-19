import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class MarketDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly longitude: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly latitude: number;
    
    @IsString()
    @IsNotEmpty()
    readonly webPage: string;

    @IsArray()
    readonly cities: Array<string>;
}
