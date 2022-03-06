import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'tasks',
})
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({
    type: 'longtext',
  })
  description: string;

  @Field(() => String)
  @Column({
    type: 'text',
    name: 'summary',
  })
  summary: string;

  @Field(() => Number)
  @Column()
  priority: number;

  @Field(() => String)
  @Column()
  type: number;

  @Field(() => Int)
  @Column({
    name: 'reporter_user_id',
    type: 'bigint',
  })
  reporterUserId: number;

  @Field(() => Int)
  @Column({
    name: 'assignee_user_id',
    type: 'bigint',
  })
  assigneeUserId: number;

  @Field(() => Int)
  @Column({
    name: 'project_id',
    type: 'bigint',
  })
  projectId: number;

  @Field(() => Int)
  @Column({
    name: 'board_id',
    type: 'bigint',
  })
  boardId: number;

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
