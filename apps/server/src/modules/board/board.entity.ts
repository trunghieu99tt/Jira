import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from '../task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'boards',
})
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column({
    name: 'name',
  })
  @Field(() => String)
  name: string;

  @Field(() => Int)
  @Column({
    name: 'project_id',
    type: 'bigint',
  })
  projectId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Field(() => [Task])
  tasks: Task[];
}
