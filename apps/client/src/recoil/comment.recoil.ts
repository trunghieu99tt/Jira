import { iComment } from '@type/comment.type';
import { atom, selectorFamily } from 'recoil';

export const commentsState = atom<{
  [key: number]: iComment[];
}>({
  key: 'commentsState',
  default: {},
});

export const taskCommentsSelector = selectorFamily<iComment[], number>({
  key: 'taskCommentsSelector',
  get:
    (taskId: number) =>
    ({ get }) => {
      if (!taskId) return [];
      const comments = get(commentsState);
      return comments[taskId] || [];
    },
});
