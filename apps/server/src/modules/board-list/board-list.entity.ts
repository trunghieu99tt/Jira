import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BoardList {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column({
    name: 'name',
  })
  @Field(() => String)
  name: string;

  @ManyToOne(() => Board, (board) => board.boardLists)
  @Field(() => Board)
  board: Board;

  @OneToMany(() => Task, (task) => task.boardList)
  @Field(() => [Task])
  tasks: Task[];
}
