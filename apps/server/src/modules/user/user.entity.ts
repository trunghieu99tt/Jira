import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardUser } from '../board-user/board-user.entity';
import { Board } from '../board/board.entity';
import { Comment } from '../comment/comment.entity';

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

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  avatar: string;

  @OneToMany(() => Board, (board) => board.owner)
  @Field(() => [Board])
  boards: Board[];

  @OneToMany(() => BoardUser, (boardUser) => boardUser.user)
  @Field(() => [BoardUser])
  boardUsers: BoardUser[];

  @OneToMany(() => Comment, (comment) => comment.author)
  @Field(() => [Comment])
  comments: Comment[];

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
