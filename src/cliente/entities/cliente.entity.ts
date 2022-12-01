import { Consulta } from "src/consulta/entities/consulta.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, RelationId } from "typeorm";

@Entity()
export class Cliente {
    @OneToOne(()=>Persona)
    @JoinColumn({name:"id_cliente"})
    persona:Persona;
    
    @PrimaryColumn()
    @RelationId((cliente:Cliente)=>cliente.persona)
    id_cliente:number;

    @Column({type:"varchar",length:15,nullable:true})
    codigo:string;

    @OneToMany(() => Consulta, (consulta) => consulta.cliente)
    consultas: Consulta[]
}
