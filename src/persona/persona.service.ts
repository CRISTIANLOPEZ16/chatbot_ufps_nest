import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, User } from 'src/base';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/persona.dto';
import { UpdatePersonaDto } from './dto/persona.dto';
import { Persona } from './entities/persona.entity';
import { hash,compare } from "bcrypt";

@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private readonly personaRepository:Repository<Persona>){}
  async log(usuario: User) {
    try{
      let newPersona = await this.personaRepository.findOne({where: {correo:usuario.correo}});

      if(newPersona && newPersona.correo==usuario.correo && (await compare(usuario.password,newPersona.password))){
          return {"status":200, "response":newPersona}
      }else{
          return {"status":401,"response":"El usuario no pertenece a este sistema"}
      }
    }catch(err){
      return {status:500,response:err.message}
    }
  }
  async create(createPersonaDto: CreatePersonaDto) {
    try{
      const persona= this.personaRepository.create(createPersonaDto)
      persona.password=await hash(createPersonaDto.password,10)
      return {status:200,response:await this.personaRepository.save(persona)}
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async findAll(pagination:Pagination) {
    try{
      return {status:200,response: await this.personaRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.personaRepository.findOne({where: {"id":id}})}
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    try{
      return {status:200,response: await this.personaRepository.update(id, updatePersonaDto)}
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async remove(id: number) {
    try{
      const persona =await this.personaRepository.findOne({where: {"id":id}})
      return {status:200,response: await this.personaRepository.remove(persona)}
    }catch(err){
      return {status:500,response:err.message}
    }
  }
}

