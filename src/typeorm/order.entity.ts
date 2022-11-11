import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public dateCreated: Date;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'order',
    nullable: false,
    default: '',
  })
  order: string;

}