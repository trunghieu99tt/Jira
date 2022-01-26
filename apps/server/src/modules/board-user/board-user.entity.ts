import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import { BoardUserRole } from './constants/board-user.constants';

registerEnumType(BoardUserRole, {
  name: 'BoardUserRole',
});

@Entity({
  name: 'board_users',
})
@ObjectType()
export class BoardUser {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column({
    type: 'enum',
    enum: BoardUserRole,
  })
  @Field(() => BoardUserRole)
  role: BoardUserRole;

  @ManyToOne(() => User, (user) => user.boardUsers)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Board, (board) => board.boardUsers)
  @Field(() => Board)
  board: Board;

  @OneToMany(() => Task, (task) => task.reportedBy)
  @Field(() => [Task])
  reportedTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  @Field(() => [Task])
  assignedTasks: Task[];

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
