import { Field, ObjectType } from '@nestjs/graphql';
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
import { Attachment } from '../attachment/attachment.entity';
import { BoardUser } from '../board-user/board-user.entity';

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

  @Field(() => BoardUser)
  @ManyToOne(() => BoardUser, (boardUser) => boardUser.reportedTasks)
  reportedBy: BoardUser;

  @Field(() => BoardUser)
  @ManyToOne(() => BoardUser, (boardUser) => boardUser.assignedTasks)
  assignedTo: BoardUser;

  @Field(() => [Attachment])
  @OneToMany(() => Attachment, (attachment) => attachment.task)
  attachments: Attachment[];

  @Field(() => BoardList)
  @ManyToOne(() => BoardList, (boardList) => boardList.tasks)
  boardList: BoardList;

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
