import { IUser } from '@type/user.types';
import { atom } from 'recoil';

export const userState = atom<IUser | null>({
  key: 'userState',
  default: {
    id: 0,
    name: 'rikikudo',
    username: 'rikikudo',
    email: '',
    avatar: '',
  },
});
