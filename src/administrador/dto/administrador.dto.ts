import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/persona.dto";

export class CreateAdministradorDto {
    @IsOptional()
    @ApiProperty()
    idAdministrador:number

    @IsNotEmpty()
    @ApiProperty()
    persona:CreatePersonaDto
}
export class UpdateAdministradorDto extends PartialType(CreateAdministradorDto){}