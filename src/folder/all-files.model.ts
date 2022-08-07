import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'allfiles'})
export class AllFiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type:'blob'})
  data:Buffer;

  @Column()
  path:string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  date:Date;

}