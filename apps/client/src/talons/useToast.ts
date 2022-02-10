import { IToast } from '@type/toast.type';
import { useSetRecoilState } from 'recoil';
import { newToastState } from 'recoil/toast.recoil';
import { ObjectTool } from 'tools';

export const useToast = () => {
  const setNewToast = useSetRecoilState(newToastState);

  const showToast = (toast: IToast) => {
    setNewToast(toast);
  };

  const success = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'success',
      title,
      message,
      duration,
    });
  };

  const error = (error: any) => {
    showToast({
      type: 'error',
      title: 'Error',
      message: ObjectTool.get(error, 'message', error),
      duration: 0,
    });
  };

  return {
    showToast,
    success,
    error,
  };
};
