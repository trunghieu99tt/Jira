import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ERole } from '../../common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

registerEnumType(ERole, {
  name: 'Role',
});

@Entity({
  name: 'project_users',
})
@ObjectType()
export class ProjectUser {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column({
    type: 'enum',
    enum: ERole,
  })
  @Field(() => ERole)
  role: ERole;

  @ManyToOne(() => User, (user) => user.projectUsers)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Project, (project) => project.projectUsers)
  @Field(() => Project)
  project: Project;

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
