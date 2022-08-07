import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'files'})
export class PageCount {
  @PrimaryGeneratedColumn()
  id: number;

  //pages in current pdf
  @Column()
  pages: number;

  //total pages of all pdf
  @Column()
  fileName:string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  date:Date;

}