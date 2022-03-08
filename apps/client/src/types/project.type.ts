export enum ProjectUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface IProjectUser {
  id: number;
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
}
