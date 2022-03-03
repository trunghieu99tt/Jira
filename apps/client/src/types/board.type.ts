import { IProject } from './project.type';
import { ITask } from './task.type';

export interface IBoard {
  id: number;
  name: string;
  project: IProject;
  tasks: ITask[];
}
