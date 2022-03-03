import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from '../project/project.entity';
import { Task } from '../task/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'boards',
})
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column({
    name: 'name',
  })
  @Field(() => String)
  name: string;

  @ManyToOne(() => Project, (project) => project.boards)
  @Field(() => Project)
  project: Project;

  @OneToMany(() => Task, (task) => task.board)
  @Field(() => [Task])
  tasks: Task[];
}
