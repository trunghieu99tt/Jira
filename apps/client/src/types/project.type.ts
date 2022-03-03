import { IUser } from './user.types';

export enum ProjectUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface IProjectUser {
  id: number;
  role: ProjectUserRole;
  user: IUser;
}

export interface IProject {
  id: number;
  name: string;
  coverPhoto: string;
  privacy: string;
  description: string;
  projectUsers: IProjectUser[];
}
