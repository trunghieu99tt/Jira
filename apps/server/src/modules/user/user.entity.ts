import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectUser } from '../project-user/project-user.entity';
import { Project } from '../project/project.entity';
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

  @OneToMany(() => Project, (board) => board.owner)
  @Field(() => [Project])
  boards: Project[];

  @OneToMany(() => ProjectUser, (boardUser) => boardUser.user)
  @Field(() => [ProjectUser])
  boardUsers: ProjectUser[];

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
