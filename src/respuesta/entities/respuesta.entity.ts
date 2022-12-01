import { Pregunta } from "src/pregunta/entities/pregunta.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Respuesta {
    @PrimaryGeneratedColumn()
    id:number
    
    @OneToOne(()=>Pregunta)
    @JoinColumn({name:"id_pregunta"})
    pregunta:Pregunta

    @RelationId((respuesta:Respuesta)=>respuesta.pregunta)
    id_pregunta:number;

    @Index({ fulltext: true })
    @Column({type: "text"})
    descripcion:string;

}
