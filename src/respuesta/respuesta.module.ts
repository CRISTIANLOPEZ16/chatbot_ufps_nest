import { Module } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';
import { Respuesta } from './entities/respuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaModule } from 'src/pregunta/pregunta.module';

@Module({
  imports: [PreguntaModule,TypeOrmModule.forFeature([Respuesta])],
  controllers: [RespuestaController],
  providers: [RespuestaService]
})
export class RespuestaModule {}
