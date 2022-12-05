import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Pagination } from 'src/base';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/consulta.dto';
import { UpdateConsultaDto } from './dto/consulta.dto';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Put()
  findAll(@Body() pagination:Pagination) {
    return this.consultaService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    return this.consultaService.update(+id, updateConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultaService.remove(+id);
  }
}
