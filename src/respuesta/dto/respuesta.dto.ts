import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreatePreguntaDto } from "src/pregunta/dto/pregunta.dto";

export class CreateRespuestaDto {
    @ApiProperty()
    @IsOptional()
    id:number
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion:string;
    @ApiProperty()
    @IsNotEmpty()
    pregunta:CreatePreguntaDto
    @ApiProperty()
    @IsOptional()
    idPregunta:number
}
export class UpdateRespuestaDto extends PartialType(CreateRespuestaDto){}