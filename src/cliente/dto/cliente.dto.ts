import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/persona.dto";

export class CreateClienteDto {
    @ApiProperty()
    @IsOptional()
    codigo:string;
    @ApiProperty()
    @IsOptional()
    idCliente:number;
    @ApiProperty()
    @IsNotEmpty()
    persona:CreatePersonaDto
}
export class UpdateClienteDto extends PartialType(CreateClienteDto){}
