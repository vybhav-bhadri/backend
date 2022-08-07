import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'allfiles'})
export class AllFiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({type:'blob',default:null})
  data:Buffer | null;

  @Column()
  path:string;

  @Column()
  pages:number;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  date:Date;

}