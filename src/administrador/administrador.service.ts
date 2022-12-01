import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/base';
import { PersonaService } from 'src/persona/persona.service';
import { Repository } from 'typeorm';
import { CreateAdministradorDto } from './dto/administrador.dto';
import { UpdateAdministradorDto } from './dto/administrador.dto';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService {
  constructor(@InjectRepository(Administrador) private readonly administradorRepository:Repository<Administrador>, private readonly personaService:PersonaService){}

  async create(createAdministradorDto: CreateAdministradorDto) {
    try{
      const persona=await this.personaService.create(createAdministradorDto.persona)
      let administrador=this.administradorRepository.create(createAdministradorDto)
      administrador.persona=persona.response
      if(persona.status==200){
        return {status:200,response: await this.administradorRepository.save(administrador)}
      }else{
        return {status:500,response: persona.response}
      }
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findAll(pagination:Pagination) {
    try{
      return {status:200,response: await this.administradorRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.administradorRepository.findOne({where:{"id_administrador":id},relations:{persona:true}})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async update(id: number, updateAdministradorDto: UpdateAdministradorDto) {
    try{
      return {status:200,response: await this.administradorRepository.update(id, updateAdministradorDto)}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async remove(id: number) {
    try{
      const administrador=await this.administradorRepository.findOne({where:{"id_administrador":id}})
      return {status:200,response: await this.administradorRepository.remove(administrador)}
    }catch(err){
      return {status:500,response:err}
    }
  }
}
