import { IUser } from '@type/user.types';
import { atom } from 'recoil';

export const userState = atom<IUser | null>({
  key: 'userState',
  default: {
    id: 0,
    name: 'rikikudo',
    username: 'rikikudo',
    email: '',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14Ghx3tSPrmM4GNHMH2AV1_tZBL91YLrAjnPjvWlLtg=s83-c-mo',
  },
});
