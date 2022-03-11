import { IBoard } from '@type/board.type';
import { IProjectUser } from '@type/project.type';
import { atom, selectorFamily } from 'recoil';

export const projectsUsersState = atom<{
  [key: string]: IProjectUser[];
}>({
  key: 'projectsUsersState',
  default: {},
});

export const selectProjectUsersByProjectId = selectorFamily<
  IProjectUser[],
  string | undefined
>({
  key: 'selectProjectUsersByProjectId',
  get:
    (projectId: string | undefined) =>
    ({ get }) => {
      if (!projectId) return [];
      const projectsUsers = get(projectsUsersState);
      return projectsUsers[projectId];
    },
});

export const projectsBoardsState = atom<{
  [key: string]: IBoard[];
}>({
  key: 'projectsBoardsState',
  default: {},
});

export const selectProjectBoardsByProjectId = selectorFamily<
  IBoard[],
  string | undefined
>({
  key: 'selectProjectBoardByProjectId',
  get:
    (projectId: string | undefined) =>
    ({ get }) => {
      if (!projectId) return [];
      const projectsBoards = get(projectsBoardsState);
      return projectsBoards[projectId] || [];
    },
});
