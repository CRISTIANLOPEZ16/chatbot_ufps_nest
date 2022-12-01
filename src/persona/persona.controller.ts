import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Render } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/persona.dto';
import { UpdatePersonaDto } from './dto/persona.dto';
import { Pagination } from 'src/base';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get("login")
  @Render("login/index")
  Login(){
    return null;
  }
  @Get("/recuperar")
  @Render("login/recuperar")
  Recuperar(){
    return null;
  }
  @Put()
  findAll(@Body() pagination:Pagination) {
    return this.personaService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
