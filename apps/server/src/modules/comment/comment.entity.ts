import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'comments',
})
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column({
    nullable: true,
  })
  content: string;

  @Field(() => Int)
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Field(() => Int)
  @Column({
    name: 'task_id',
    type: 'bigint',
  })
  taskId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
