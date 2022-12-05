import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/base';
import { PersonaService } from 'src/persona/persona.service';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>, private readonly personaService:PersonaService){}
  
  async create(createClienteDto: CreateClienteDto) {
    try{
      const persona=await this.personaService.create(createClienteDto.persona);
      let cliente=this.clienteRepository.create(createClienteDto)
      cliente.persona=persona.response
      if(persona.status==200){
        return {status:200,response: await this.clienteRepository.save(cliente)}
      }else{
        return {status:500,response:persona.response}
      }
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async findAll(pagination:Pagination) {
   try{
    return {status:200,response: await this.clienteRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err.message}
    } 
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.clienteRepository.findOne({where: {"id_cliente":id},relations:{persona:true}})}
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try{
      const persona= await this.personaService.update(id, updateClienteDto.persona);
      if(persona.status==200) {

        return {status:200,response: await this.clienteRepository.update(id,updateClienteDto)}
      }else{
        return {status:500,response:persona.response}
      }
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async remove(id: number) {
    try{
      const cliente=await this.clienteRepository.findOne({where: {"id_cliente":id}})
      return {status:200,response: await this.clienteRepository.remove(cliente)}
    }catch(err){
      return {status:500,response:err.message}
    }
  }
}
