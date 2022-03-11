import { atom } from 'recoil';

export const activeTaskState = atom<number>({
  key: 'activeTaskState',
  default: -1,
});
