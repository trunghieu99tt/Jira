import { IProjectUser } from './project.type';

export interface IBoardTask {
  id: number;
  type: string;
  name: string;
  boardId: number;
  priority: number;
  assigneeName: string;
  listPosition: number;
  assigneeAvatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends IBoardTask {
  id: number;
  name: string;
  boardId: number;
  summary: string;
  coverPhoto: string;
  description: string;
  assigneeUserId: number;
}

export interface ITaskDetailResponse extends ITask {
  assignedTo: IProjectUser;
  reportedBy: IProjectUser;
}
export interface iTaskLabel {
  id: number;
  name: string;
  color: string;
}

export interface IUpdateBoardTask {
  updateType: string;
  sourceBoardId: number;
  destinationBoardId: number;
  data: Partial<IBoardTask>;
}

export interface IUpdateTask {
  updateType: string;
  data: Partial<ITask>;
}
