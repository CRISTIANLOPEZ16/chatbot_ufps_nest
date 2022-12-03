import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Pagination } from 'src/base';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Put()
  findAll(pagination:Pagination) {
    return this.clienteService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
