import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({
  name: 'task_label',
})
export class TaskLabel {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column({
    name: 'task_id',
    type: 'bigint',
  })
  @Field(() => Number)
  taskId: number;

  @Column({
    type: 'bigint',
    name: 'label_id',
  })
  @Field(() => Number)
  labelId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @Field(() => Date)
  updatedAt: Date;
}
