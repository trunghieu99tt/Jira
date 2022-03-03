import { IToast } from '@type/toast.type';
import { atom } from 'recoil';

export const newToastState = atom<IToast | null>({
  key: 'newToastState',
  default: null,
});
