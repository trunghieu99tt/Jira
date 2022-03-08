import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardTask } from '../task/dtos/board-task-output.dto';

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

  @Field(() => [BoardTask])
  tasks: BoardTask[];
}
