import { IsNumber, IsPositive } from "class-validator";
import { MinLength, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    name!:string;

    @IsNumber({
        maxDecimalPlaces: 2,
    })
    @IsPositive()
    price!:number;
}
