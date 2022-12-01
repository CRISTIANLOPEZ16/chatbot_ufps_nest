import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/base';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/persona.dto';
import { UpdatePersonaDto } from './dto/persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private readonly personaRepository:Repository<Persona>){}
  async create(createPersonaDto: CreatePersonaDto) {
    try{
      return {status:200,response:await this.personaRepository.save(this.personaRepository.create(createPersonaDto))}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findAll(pagination:Pagination) {
    try{
      return {status:200,response: await this.personaRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.personaRepository.findOne({where: {"id":id}})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    try{
      return {status:200,response: await this.personaRepository.update(id, updatePersonaDto)}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async remove(id: number) {
    try{
      const persona =await this.personaRepository.findOne({where: {"id":id}})
      return {status:200,response: await this.personaRepository.remove(persona)}
    }catch(err){
      return {status:500,response:err}
    }
  }
}
