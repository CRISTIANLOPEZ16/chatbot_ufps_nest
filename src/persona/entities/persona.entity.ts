import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum tipoUsuario {
    ADMINISTRADOR = 'Administrador',
    CLIENTE = 'Cliente',
  }
@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type: "varchar",length:60})
    nombre:string;

    @Column({type: "varchar",length:60})
    apellido:string

    @Column({type: "varchar",length:100,unique:true})
    correo:string;

    @Column({
        name: 'tipo_usuario',
        type: 'enum',
        enum: tipoUsuario,
        nullable: false,
        default: tipoUsuario.CLIENTE,
      })
    tipoUsuario:tipoUsuario;
}
