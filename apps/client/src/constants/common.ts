export const AVATAR_COLORS_BY_LETTER = {
  a: '#f44336',
  b: '#e91e63',
  c: '#9c27b0',
  d: '#673ab7',
  e: '#3f51b5',
  f: '#2196f3',
  g: '#03a9f4',
  h: '#00bcd4',
  i: '#009688',
  j: '#4caf50',
  k: '#8bc34a',
  l: '#cddc39',
  m: '#ffeb3b',
  n: '#ffc107',
  o: '#ff9800',
  p: '#ff5722',
  q: '#795548',
  r: '#9e9e9e',
  s: '#607d8b',
  t: '#000000',
  u: '#ffffff',
  v: '#000000',
  w: '#000000',
  x: '#000000',
  y: '#000000',
  z: '#000000',
};

export const KeyCodes = {
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  M: 77,
};

export const ACCEPT_FILE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
export const MAX_NUMBER_OF_FILES = 5;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const MAX_NUMBER_OF_ATTACHMENTS = 20;
export const MAX_NUMBER_OF_COVER_PHOTO = 1;

export const TIME_TO_MILLISECONDS: {
  [key: string]: number;
} = {
  SECONDS: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  MONTH: 1000 * 60 * 60 * 24 * 30,
  YEAR: 1000 * 60 * 60 * 24 * 30 * 12,
};
export const TIME_UNIT: {
  [key: string]: string;
} = {
  SECONDS: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
};
