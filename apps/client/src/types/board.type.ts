import { IBoardTask } from './task.type';

export interface IBoard {
  id: number;
  name: string;
  tasks?: IBoardTask[];
}
