import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// entities
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Board } from '../board/board.entity';
import { ProjectUser } from '../project-user/project-user.entity';

// enums
import { EPrivacy } from '../../common/enums';
import { Task } from '../task/task.entity';

registerEnumType(EPrivacy, {
  name: 'Privacy',
});

@Entity({
  name: 'projects',
})
@ObjectType()
export class Project {
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

  @Field(() => EPrivacy)
  @Column({
    name: 'privacy',
    type: 'enum',
    enum: EPrivacy,
  })
  privacy: EPrivacy;

  @Field(() => String)
  @Column()
  description: string;

  @OneToMany(() => Board, (board) => board.project)
  @Field(() => [Board])
  boards: Board[];

  @ManyToOne(() => User, (user) => user.projects)
  @Field(() => User)
  owner: User;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  @Field(() => [ProjectUser])
  projectUsers: ProjectUser[];

  @OneToMany(() => Comment, (comment) => comment.board)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Task, (task) => task.project)
  @Field(() => [Task])
  tasks: Task[];

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