import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import { BoardList } from '../board-list/board-list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardUser } from '../board-user/board-user.entity';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
import { BoardPrivacy } from './constants/board.constant';

registerEnumType(BoardPrivacy, {
  name: 'BoardPrivacy',
});

@Entity({
  name: 'boards',
})
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({
    name: 'cover_photo',
  })
  coverPhoto: string;

  @Field(() => BoardPrivacy)
  @Column({
    name: 'privacy',
    type: 'enum',
    enum: BoardPrivacy,
  })
  privacy: BoardPrivacy;

  @Field(() => String)
  @Column()
  description: string;

  @OneToMany(() => BoardList, (boardList) => boardList.board)
  @Field(() => [BoardList])
  boardLists: BoardList[];

  @ManyToOne(() => User, (user) => user.boards)
  @Field(() => User)
  owner: User;

  @OneToMany(() => BoardUser, (boardUser) => boardUser.board)
  @Field(() => [BoardUser])
  boardUsers: BoardUser[];

  @OneToMany(() => Comment, (comment) => comment.board)
  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Number)
  userCount: number;

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
