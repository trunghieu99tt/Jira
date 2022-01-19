import { Socket } from 'socket.io-client';

export type TTheme = 'LIGHT' | 'DARK';
export type TScreenSize = 'DESKTOP' | 'TABLET' | 'MOBILE';

export type TAppAction = {
  type: 'SET_SOCKET';
  payload: Socket | null;
};

export type TAppState = {
  socket: Socket | null;
};

export type TAppDispatch = (action: TAppAction) => void;

export type TAppContextProps = {
  children: React.ReactNode;
};

export interface Size {
  width: number | undefined;
  height: number | undefined;
}
