import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/base';
import { ConsultaService } from 'src/consulta/consulta.service';
import { Any, Repository } from 'typeorm';
import { CreatePreguntaDto } from './dto/pregunta.dto';
import { UpdatePreguntaDto } from './dto/pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';

@Injectable()
export class PreguntaService {
  constructor(@InjectRepository(Pregunta) private readonly preguntaRepository:Repository<Pregunta>, private readonly consultaService:ConsultaService) {}

  async create(createPreguntaDto: CreatePreguntaDto) {
    try{
      if(createPreguntaDto.idConsulta!=undefined){
        const consulta= await this.consultaService.create(createPreguntaDto.consulta)
        let pregunta=this.preguntaRepository.create(createPreguntaDto)
        pregunta.consulta=consulta.response;
        if(consulta.status==200){
          return {status:200,response:await this.preguntaRepository.save(pregunta)}
        }else{
          return {status:500,response:await consulta.response}
        }
      }else{
        return {status:200,response: await this.preguntaRepository.save(this.preguntaRepository.create(createPreguntaDto))}
      }
    }catch(err){
      return {status:500,response:err}
    }
  }

  async findAll(pagination:Pagination) {
    try{
      return {status:200,response: await this.preguntaRepository.findAndCount({take:pagination.take,skip:pagination.skip})}
    }catch(err){
      return {status:500,response:err.message}
    }
  }

  async findOne(id: number) {
    try{
      return {status:200,response: await this.preguntaRepository.findOne({where:{"id":id},relations:{consulta:true}})}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    try{
      return {status:200,response: await this.preguntaRepository.update(id, updatePreguntaDto)}
    }catch(err){
      return {status:500,response:err}
    }
  }
  async search(texto:any){
    try{
      console.log(texto)
      return {status:200,response: await this.preguntaRepository.createQueryBuilder("pregunta").where('MATCH(descripcion) AGAINST(:search IN BOOLEAN MODE)', {
        search: texto,
      }).getMany()}
    }catch(err){
      return {status:500,response:err}
    }
  }

  async remove(id: number) {
    try{
      const pregunta=await this.preguntaRepository.findOne({where:{"id":id}})
      return {status:200,response: await this.preguntaRepository.remove(pregunta)}
    }catch(err){
      return {status:500,response:err}
    }
  }
}
