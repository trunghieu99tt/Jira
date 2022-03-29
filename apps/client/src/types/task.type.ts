import { IBoard } from './board.type';
import { IProject, IProjectUser } from './project.type';

export interface IBoardTask {
  id: number;
  type: string;
  name: string;
  priority: number;
  assigneeName: string;
  listPosition: number;
  assigneeAvatar: string;
  updatedAt: Date;
}

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
