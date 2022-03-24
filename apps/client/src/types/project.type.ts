import { IBoard } from './board.type';

export enum ProjectUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface IProjectUser {
  id: number;
  userId: number;
  role: ProjectUserRole;
  name: string;
  avatar?: string;
}

export interface IProject {
  id: number;
  name: string;
  coverPhoto: string;
  privacy: string;
  description: string;
  projectUsers: IProjectUser[];
  boards: IBoard[];
}

export interface IProjectCreateInput {
  name: string;
  privacy: number;
  description: string;
  ownerUserId: number;
  coverPhotoFileId: number | null;
}
