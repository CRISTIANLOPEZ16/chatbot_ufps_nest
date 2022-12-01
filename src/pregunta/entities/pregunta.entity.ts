import { Consulta } from "src/consulta/entities/consulta.entity";
import { Respuesta } from "src/respuesta/entities/respuesta.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Pregunta {
    @OneToOne(()=>Consulta)
    @JoinColumn({name:"id_consulta"})
    consulta:Consulta;

    @OneToOne(()=>Respuesta)
    @JoinColumn({name:"id_respuesta"})
    id_respuesta:Respuesta;
    
    @RelationId((pregunta:Pregunta)=>pregunta.consulta)
    id_consulta:number;

    @PrimaryGeneratedColumn()
    id:number

    @Index({ fulltext: true })
    @Column({type:"text"})
    descripcion:string;
}
