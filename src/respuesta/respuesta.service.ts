import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/base';
import { PreguntaService } from 'src/pregunta/pregunta.service';
import { Repository } from 'typeorm';
import { CreateRespuestaDto } from './dto/respuesta.dto';
import { UpdateRespuestaDto } from './dto/respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';

@Injectable()
export class RespuestaService {
  constructor(@InjectRepository(Respuesta) private readonly respuestaRepository:Repository<Respuesta>,private readonly preguntaService:PreguntaService){}
  async create(createRespuestaDto: CreateRespuestaDto) {
    try{
      if(createRespuestaDto.idPregunta!=undefined){
        const pregunta= await this.preguntaService.create(createRespuestaDto.pregunta)
        let respuesta=this.respuestaRepository.create(createRespuestaDto)
        respuesta.pregunta=pregunta.response;
        if(pregunta.status==200){
          return {status:200,response:await this.respuestaRepository.save(respuesta)}
        }else{
          return {status:500,response:await pregunta.response}
        }
      }else{
        return {status:200,response: await this.respuestaRepository.save(this.respuestaRepository.create(createRespuestaDto))}
      }
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findAll(pagination:Pagination) {
    try{
      return {status:200,response: await this.respuestaRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.respuestaRepository.findOne({where:{"id":id},relations:{pregunta:true}})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async update(id: number, updateRespuestaDto: UpdateRespuestaDto) {
    try{
      return {status:200,response: await this.respuestaRepository.update(id, updateRespuestaDto)}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async remove(id: number) {
    try{
      const respuesta=await this.respuestaRepository.findOne({where:{"id":id}})
      return {status:200,response: await this.respuestaRepository.remove(respuesta)}
    }catch(err){
      return {status:500,response:err}
    }
  }
}
