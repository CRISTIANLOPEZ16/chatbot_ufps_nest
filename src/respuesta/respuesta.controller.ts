import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { CreateRespuestaDto } from './dto/respuesta.dto';
import { UpdateRespuestaDto } from './dto/respuesta.dto';
import { Pagination } from 'src/base';

@Controller('respuesta')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestaService) {}

  @Post()
  create(@Body() createRespuestaDto: CreateRespuestaDto) {
    return this.respuestaService.create(createRespuestaDto);
  }

  @Put()
  findAll(pagination:Pagination) {
    return this.respuestaService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRespuestaDto: UpdateRespuestaDto) {
    return this.respuestaService.update(+id, updateRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaService.remove(+id);
  }
}
