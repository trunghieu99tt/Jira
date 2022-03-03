import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

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

  @Field(() => String)
  @Column({
    nullable: true,
  })
  file: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Field(() => Project)
  @ManyToOne(() => Project, (board) => board.comments)
  board: Project;

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
