import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, RelationId } from "typeorm";

@Entity()
export class Administrador {
    @OneToOne(()=>Persona)
    @JoinColumn({name:"id_administrador"})
    persona:Persona;
    
    @PrimaryColumn()
    @RelationId((administrador:Administrador)=>administrador.persona)
    id_administrador:number;

    @Column({type: "tinyint",default:0})
    administradorSecundario:boolean;
}
