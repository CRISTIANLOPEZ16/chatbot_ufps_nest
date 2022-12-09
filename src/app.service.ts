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
import { CreateRespuestaDto } from './respuesta/dto/respuesta.dto';
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
            if(respuestas.response!=null) {
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
              var preguntav : CreatePreguntaDto={
                id: 0,
                descripcion: texto.text,
                idConsulta: 0,
                consulta: consulta
              } 
              const preguntaCreda=await this.preguntaService.create(preguntav)
              preguntav.id=preguntaCreda.response.id
              const respuesta :CreateRespuestaDto={
                id: 0,
                descripcion: 'Sin responder',
                pregunta: preguntav,
                idPregunta: preguntaCreda.response.id
              }
              await this.respuestaService.create(respuesta)
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
