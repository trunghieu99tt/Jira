import { IUser } from './user.types';

export enum BoardUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface IBoardUser {
  id: number;
  role: BoardUserRole;
  user: IUser;
}

export interface IBoard {
  id: number;
  name: string;
  coverPhoto: string;
  privacy: string;
  description: string;
  boardUsers: IBoardUser[];
}
