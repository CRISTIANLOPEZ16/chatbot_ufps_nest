import { Injectable } from '@nestjs/common';
import { connection } from './dialogFlow';
import { PreguntaService } from './pregunta/pregunta.service';

@Injectable()
export class AppService {
  constructor(private readonly preguntaService:PreguntaService){}
  async getDialog(texto: any) {
    try{
      let intent:any = await connection.detectIntent('chatbot-354104','1234567',texto.text,'es');
      if(intent.queryResult.intent.displayName=="Saludo"){
        return {status:200,response:intent.queryResult.fulfillmentText}
    }else{
      return {status:200,response: await this.preguntaService.search(intent.queryResult.parameters.fields.any.listValue.values)}
    }
    }catch(err){
      return {status:500,response:err}
    }
  }
  
}
