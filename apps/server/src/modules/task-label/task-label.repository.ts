import { EntityRepository, Repository } from 'typeorm';
import { TaskLabel } from './task-label.entity';

@EntityRepository(TaskLabel)
export class TaskLabelRepository extends Repository<TaskLabel> {}
