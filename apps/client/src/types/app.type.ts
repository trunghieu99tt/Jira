import { Socket } from 'socket.io-client';

export type TTheme = 'LIGHT' | 'DARK';
export type TScreenSize = 'DESKTOP' | 'TABLET' | 'MOBILE';
export type TSize = 'SMALL' | 'MEDIUM' | 'LARGE';
export type TModalPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

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

export type TTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TTransformOrigin =
  | 'top right'
  | 'top left'
  | 'bottom right'
  | 'bottom left'
  | 'center center';
