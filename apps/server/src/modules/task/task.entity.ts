import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '../board/board.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attachment } from '../attachment/attachment.entity';
import { ProjectUser } from '../project-user/project-user.entity';

@Entity({
  name: 'tasks',
})
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => ProjectUser)
  @ManyToOne(() => ProjectUser, (boardUser) => boardUser.reportedTasks)
  reportedBy: ProjectUser;

  @Field(() => ProjectUser)
  @ManyToOne(() => ProjectUser, (boardUser) => boardUser.assignedTasks)
  assignedTo: ProjectUser;

  @Field(() => [Attachment])
  @OneToMany(() => Attachment, (attachment) => attachment.task)
  attachments: Attachment[];

  @Field(() => Board)
  @ManyToOne(() => Board, (boardList) => boardList.tasks)
  boardList: Board;

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
