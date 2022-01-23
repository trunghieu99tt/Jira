import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../task/task.entity';

@Entity({
  name: 'attachments',
})
@ObjectType()
export class Attachment {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number;

  @Field(() => String)
  @Column()
  file: string;

  @Field(() => Task)
  @ManyToOne(() => Task, (task) => task.attachments)
  task: Task;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
