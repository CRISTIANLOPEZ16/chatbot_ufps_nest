import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateConsultaDto } from "src/consulta/dto/consulta.dto";

export class CreatePreguntaDto {
    @ApiProperty()
    @IsOptional()
    id:number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion:string;
    @ApiProperty()
    @IsInt()
    idConsulta:number
    @ApiProperty()
    @IsNotEmpty()
    consulta:CreateConsultaDto
}
export class UpdatePreguntaDto extends PartialType(CreatePreguntaDto){}