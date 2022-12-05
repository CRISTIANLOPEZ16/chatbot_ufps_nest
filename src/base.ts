import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class Pagination{
    @IsInt()
    take:number;
    @IsInt()
    skip:number
}
export class User{
    @IsEmail()
    @IsNotEmpty()
    correo:string;
    @IsString()
    @IsNotEmpty()
    password:string;
}