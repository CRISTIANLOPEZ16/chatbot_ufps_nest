import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { Administrador } from './entities/administrador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from 'src/persona/persona.module';

@Module({
  imports: [PersonaModule,TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradorController],
  providers: [AdministradorService]
})
export class AdministradorModule {}
