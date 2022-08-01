import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, PrimaryColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Folder } from './folder.model';

@Entity({name:'files'})
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type:'blob'})
  data:Buffer;

  @Column()
  path:string;

  @ManyToOne(() => Folder, (folder) => folder.files)
  folder:Folder

}