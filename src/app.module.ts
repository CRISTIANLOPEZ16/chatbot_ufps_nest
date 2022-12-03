import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { AdministradorModule } from './administrador/administrador.module';
import { ClienteModule } from './cliente/cliente.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { RespuestaModule } from './respuesta/respuesta.module';
import { ConsultaModule } from './consulta/consulta.module';
import { typeOrmAsyncConfig } from './typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/env/.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    PersonaModule,
    AdministradorModule,
    ClienteModule,
    PreguntaModule,
    RespuestaModule,
    ConsultaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
