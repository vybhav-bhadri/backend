import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, PrimaryColumn, OneToMany } from 'typeorm';
import { File } from './file.model';

@Entity({name:'folders'})
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => File, (file) => file.folder)
  files:File[]

}