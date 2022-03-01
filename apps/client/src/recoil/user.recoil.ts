import { atom } from 'recoil';

export const userState = atom<any>({
  key: 'userState',
  default: null,
});
