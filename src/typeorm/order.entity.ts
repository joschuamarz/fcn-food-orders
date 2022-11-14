import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public dateCreated: Date;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'food',
    nullable: true,
    default: '',
  })
  food: string;

  @Column({
    name: 'supplement',
    nullable: true,
    default: '',
  })
  supplement: string;

}