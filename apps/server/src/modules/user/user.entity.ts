import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@ObjectType()
@Entity({
  name: 'users',
})
export class User {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number;

  @Field(() => String)
  @Column({
    name: 'username',
  })
  username: string;

  @Field(() => String)
  @Column({
    name: 'password',
  })
  password: string;

  @Field(() => String)
  @Column({
    name: 'email',
  })
  email: string;

  @Field(() => Int)
  @Column()
  name: string;

  @Field(() => Int)
  @Column({
    name: 'avatar_file_id',
  })
  avatarFileId: number;

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
