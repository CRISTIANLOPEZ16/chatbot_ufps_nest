import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/base';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/consulta.dto';
import { UpdateConsultaDto } from './dto/consulta.dto';
import { Consulta } from './entities/consulta.entity';

@Injectable()
export class ConsultaService {
  constructor(@InjectRepository(Consulta) private readonly consultaRepository:Repository<Consulta>){}
  
  async create(createConsultaDto: CreateConsultaDto) {
    try{
      return {status:200,response: await this.consultaRepository.save(this.consultaRepository.create(createConsultaDto))}
    }catch(err){
      return {status:500,response:err}
    }    
  }

  async findAll(pagination:Pagination) {
    try{
      return {status:200,response: await this.consultaRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.consultaRepository.findOne({where:{"id":id},relations:{cliente:true}})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async update(id: number, updateConsultaDto: UpdateConsultaDto) {
    try{
      return {status:200,response: await this.consultaRepository.update(id,updateConsultaDto)}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async remove(id: number) {
    try{
      const consulta= await this.consultaRepository.findOne({where:{"id":id}})
      return {status:200,response: await this.consultaRepository.remove(consulta)}
    }catch(err){
      return {status:500,response:err}
    }
  }
}
