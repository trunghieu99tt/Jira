import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project_users')
@ObjectType()
export class ProjectUser {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @Column({
    name: 'project_id',
    type: 'bigint',
  })
  projectId: number;

  @Field(() => Int)
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Field(() => Int)
  @Column({
    name: 'role',
  })
  role: number;

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
