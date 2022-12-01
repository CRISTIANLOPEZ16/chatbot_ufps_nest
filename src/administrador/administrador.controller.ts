import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Render } from '@nestjs/common';
import { Pagination } from 'src/base';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/administrador.dto';
import { UpdateAdministradorDto } from './dto/administrador.dto';

@Controller('administrador')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @Post()
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradorService.create(createAdministradorDto);
  }

  @Put()
  findAll(@Body() pagination:Pagination) {
    return this.administradorService.findAll(pagination);
  }

  @Get("panel")
  @Render("panel/index")
  PanelIndex(){}

  @Get("panel/listar")
  @Render("panel/listar")
  ListarUsuarios(){}

  @Get("panel/agregar")
  @Render("panel/agregar")
  agregar(){}

  @Get("panel/usuario")
  @Render("panel/agregarUsuario")
  usuario(){}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministradorDto: UpdateAdministradorDto) {
    return this.administradorService.update(+id, updateAdministradorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administradorService.remove(+id);
  }
}
