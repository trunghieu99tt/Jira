import { IBoard } from '@type/board.type';
import { IBoardTask } from '@type/task.type';
import { atom, selectorFamily } from 'recoil';

export const boardsState = atom<{ [key: number]: IBoard }>({
  key: 'boardState',
  default: {},
});

export const boardSelector = selectorFamily<IBoard, number>({
  key: 'boardSelector',
  get:
    (boardId: number) =>
    ({ get }) => {
      const boards = get(boardsState);
      return boards[boardId];
    },
});

export const boardTasksSelector = selectorFamily<IBoardTask[], number>({
  key: 'boardTasksSelector',
  get:
    (boardId: number) =>
    ({ get }) => {
      const board = get(boardSelector(boardId));
      return board?.tasks || [];
    },
});
