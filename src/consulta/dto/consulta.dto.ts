import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { isInt16Array } from "util/types";
import { estadoConsulta } from "../entities/consulta.entity";

export class CreateConsultaDto {
    @ApiProperty()
    @IsOptional()
    id:number
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estado:estadoConsulta
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idCliente:number;
}

export class UpdateConsultaDto extends PartialType(CreateConsultaDto){}