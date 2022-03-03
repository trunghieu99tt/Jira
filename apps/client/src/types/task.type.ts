import { IBoard } from './board.type';
import { IProject, IProjectUser } from './project.type';

export interface ITask {
  id: number;
  name: string;
  description: string;
  reportedBy: IProjectUser;
  assignedTo: IProjectUser;
  project: IProject;
  board: IBoard;
  createdAt: Date;
  updatedAt: Date;
}
