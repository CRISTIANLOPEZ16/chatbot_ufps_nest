import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
export enum estadoConsulta{
    RESUELTA='RESUELTA',REVISION='EN REVISION',INCONGRUENTE='INCONGRUENTE'
}

@Entity()
export class Consulta {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'enum',
        enum: estadoConsulta,
        nullable: false,
        default: estadoConsulta.REVISION,
      })
      estado:estadoConsulta

      @ManyToOne(() => Cliente, (cliente) => cliente.consultas)
      cliente:Cliente
      
      @RelationId((consulta:Consulta)=>consulta.cliente)
      id_cliente:number;
}
