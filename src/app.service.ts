import { Injectable } from '@nestjs/common';
import { ClienteService } from './cliente/cliente.service';
import { CreateClienteDto } from './cliente/dto/cliente.dto';
import { connection } from './dialogFlow';
import { CreatePersonaDto } from './persona/dto/persona.dto';
import { tipoUsuario } from './persona/entities/persona.entity';
import { PreguntaService } from './pregunta/pregunta.service';
import { RespuestaService } from './respuesta/respuesta.service';

@Injectable()
export class AppService {
  constructor(
    private readonly respuestaService: RespuestaService,
    private readonly clienteService: ClienteService,
  ) {}
  async getDialog(texto: any) {
    try {
      let intent: any = await connection.detectIntent(
        'chatbotufps',
        '1233244567',
        texto.text,
        'es',
      );
      console.log(intent);
      if (intent.queryResult.intent.displayName == 'Saludo') {
        return { status: 200, response: intent.queryResult.fulfillmentText };
      } else if (intent.queryResult.intent.displayName == 'leer_nombre') {
        return { status: 200, response: intent.queryResult.fulfillmentText };
      } else if (intent.queryResult.intent.displayName == 'Identificar') {
        return {
          status: 200,
          response: await this.respuestaService.search(
            intent.queryResult.parameters.fields.any.listValue.values[0]
              .stringValue,
          ),
        };
      } else if (intent.queryResult.intent.displayName == 'Registro') {
        const persona: CreatePersonaDto = {
          id: 0,
          nombre:
            intent.queryResult.parameters.fields['given-name'].stringValue,
          apellido:
            intent.queryResult.parameters.fields['last-name'].listValue
              .values[0].stringValue,
          correo: intent.queryResult.parameters.fields['email'].stringValue,
          password: '1232343',
          tipoUsuario: tipoUsuario.CLIENTE,
        };
        const cliente: CreateClienteDto = {
          codigo: '',
          idCliente: intent.queryResult.parameters.fields.codigo.numberValue,
          persona: persona,
        };
        this.clienteService.create(cliente);
      }
    } catch (err) {
      
      console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
      return { status: 500, response: err };
    }
  }
}
