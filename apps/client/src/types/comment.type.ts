import { IUser } from './user.types';

export interface iComment {
  id: number;
  taskId: number;
  content: string;
  updatedAt: Date;
  owner: Partial<IUser>;
}
