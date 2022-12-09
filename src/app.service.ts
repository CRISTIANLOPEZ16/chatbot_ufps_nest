import { Injectable } from '@nestjs/common';
import { ClienteService } from './cliente/cliente.service';
import { CreateClienteDto } from './cliente/dto/cliente.dto';
import { CreateConsultaDto } from './consulta/dto/consulta.dto';
import { Consulta, estadoConsulta } from './consulta/entities/consulta.entity';
import { connection } from './dialogFlow';
import { CreatePersonaDto } from './persona/dto/persona.dto';
import { tipoUsuario } from './persona/entities/persona.entity';
import { CreatePreguntaDto } from './pregunta/dto/pregunta.dto';
import { PreguntaService } from './pregunta/pregunta.service';
import { RespuestaService } from './respuesta/respuesta.service';

@Injectable()
export class AppService {
  constructor(
    private readonly respuestaService: RespuestaService,
    private readonly clienteService: ClienteService,
    private readonly preguntaService: PreguntaService
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
        const respuestas= await this.respuestaService.search(
          intent.queryResult.parameters.fields.any.listValue.values[0]
            .stringValue)
            if(respuestas.response.length > 0 || respuestas.response!=null) {
              return {
                status: 200,
                response: respuestas,
              };
            }else{
              const consulta: CreateConsultaDto={
                id: 0,
                estado: estadoConsulta.REVISION,
                idCliente: 0
              }
              const pregunta : CreatePreguntaDto={
                id: 0,
                descripcion: '',
                idConsulta: 0,
                consulta: consulta
              } 
              await this.preguntaService.create(pregunta)
              return {
                status: 200,
                response: "Su pregunta no se encuentra en el sistema, pero ahora fue almacenada por favor registrese para enviar le un correo con la respuesta",
              };
            }
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
          codigo: intent.queryResult.parameters.fields.codigo.numberValue,
          idCliente: 0,
          persona: persona,
        };
        this.clienteService.create(cliente);
        return { status: 200, response:"Gracias por registrarte, te contactaremos cuando este lista tu pregunta"};
      }
    } catch (err) {
      console.log(err)
      const intent:any = await connection.detectIntent('chatbotufps','1234567','sin respuesta','es');
      return { status: 200, response: intent.queryResult.fulfillmentText };
    }
  }
}
