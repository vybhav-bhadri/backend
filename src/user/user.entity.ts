import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED'
}

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  email:string;

  @Column()
  password: string;
  
  @Column({ default: Status.ACTIVE })
  isActive: Status;

}