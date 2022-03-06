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
    name: 'board_id',
    type: 'bigint',
  })
  boardId: number;

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
