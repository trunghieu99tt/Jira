import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttachmentOutput } from './dtos/attachment-output.dto';
import { TaskUser } from './dtos/task-user-output.dto';

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
  type: string;

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

  @Field(() => Int)
  @Column({
    name: 'list_position',
  })
  listPosition: number;

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

  @Field(() => TaskUser)
  assignee: TaskUser;

  @Field(() => TaskUser)
  reporter: TaskUser;

  @Field(() => [AttachmentOutput])
  attachments: AttachmentOutput[];
}
