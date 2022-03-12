import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Field(() => Number)
  @Column({
    type: 'bigint',
    name: 'file_id',
  })
  fileId: number;

  @Field(() => Int)
  @Column({
    type: 'bigint',
    name: 'task_id',
    nullable: true,
  })
  taskId: number;

  @Field(() => Int)
  @Column({
    type: 'bigint',
    name: 'comment_id',
    nullable: true,
  })
  commentId: number;

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
