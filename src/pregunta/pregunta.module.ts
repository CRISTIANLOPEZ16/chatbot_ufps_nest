import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { Pregunta } from './entities/pregunta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaModule } from 'src/consulta/consulta.module';

@Module({
  imports: [ConsultaModule,TypeOrmModule.forFeature([Pregunta])],
  controllers: [PreguntaController],
  providers: [PreguntaService],
  exports: [PreguntaService]
})
export class PreguntaModule {}
