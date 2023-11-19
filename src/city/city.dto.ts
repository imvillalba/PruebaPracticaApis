import {IsArray, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class CityDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly country: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly population: number;
    
    @IsArray()
    readonly markets: Array<string>;
}
