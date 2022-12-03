import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { CreatePreguntaDto } from './dto/pregunta.dto';
import { UpdatePreguntaDto } from './dto/pregunta.dto';
import { Pagination } from 'src/base';

@Controller('pregunta')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntaService) {}

  @Post()
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntaService.create(createPreguntaDto);
  }

  @Put()
  findAll(pagination:Pagination) {
    return this.preguntaService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntaService.update(+id, updatePreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preguntaService.remove(+id);
  }
}
