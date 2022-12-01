import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { tipoUsuario } from "../entities/persona.entity";

export class CreatePersonaDto {
    @ApiProperty()
    @IsOptional()
    id:number
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    apellido:string
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    correo:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipoUsuario:tipoUsuario
}

export class UpdatePersonaDto extends PartialType(CreatePersonaDto){}