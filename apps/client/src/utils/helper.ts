import { TIME_TO_MILLISECONDS, TIME_UNIT } from '@constants/common';

const nFormatter = (num: number, digits = 2): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

const formatNumber = (value: number | string): string => {
  return (value && (value as number).toLocaleString('en-US')) || '0';
};

const getDaysDiffBetweenDates = (date1: Date, date2: Date): number => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
};

const urlify = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
};

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const calcDiffTimeString = (date: Date): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const diff = Math.floor(Date.now() - date.getTime());

  const calculateUnits = (
    value: number,
    unitValue: number,
  ): {
    units: number;
    isGreaterThan1: boolean;
  } => {
    const units = Math.floor(value / unitValue);
    return {
      units,
      isGreaterThan1: units > 1,
    };
  };

  const calcResultValue = (unitToShow: string) => {
    const { isGreaterThan1, units } = calculateUnits(
      diff,
      TIME_TO_MILLISECONDS[unitToShow],
    );
    if (units <= 0) return 'Just now';
    return `${units} ${TIME_UNIT[unitToShow]}${isGreaterThan1 ? 's' : ''} ago`;
  };

  if (diff < TIME_TO_MILLISECONDS.MINUTE) return calcResultValue('SECONDS');

  if (diff < TIME_TO_MILLISECONDS.HOUR) return calcResultValue('MINUTE');

  if (diff < TIME_TO_MILLISECONDS.DAY) return calcResultValue('HOUR');

  if (diff < TIME_TO_MILLISECONDS.MONTH) return calcResultValue('DAY');

  if (diff < TIME_TO_MILLISECONDS.YEAR) return calcResultValue('MONTH');

  if (diff >= TIME_TO_MILLISECONDS.YEAR) return calcResultValue('YEAR');

  return date.toLocaleDateString();
};

const moveItemWithinArray = (arr: any[], item: any, toIndex: number) => {
  const fromIndex = arr.indexOf(item);

  if (fromIndex === -1) {
    return;
  }

  const newArr = [...arr];
  console.log('fromIndex', fromIndex);
  newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
  return newArr;
};

const insertItemIntoArray = (arr: any[], item: any, toIndex: number) => {
  const newArr = [...arr];
  newArr.splice(toIndex, 0, item);
  return newArr;
};

const removeMaliciousTags = (text: string): string => {
  const tagsToRemove = ['script', 'style', 'iframe', 'meta', 'link'];
  const tagsToRemoveRegex = new RegExp(
    `<(${tagsToRemove.join('|')})[^>]*>.*?</\\1>`,
    'gi',
  );
  return text.replace(tagsToRemoveRegex, '');
};

export {
  urlify,
  nFormatter,
  formatNumber,
  validateEmail,
  calcDiffTimeString,
  moveItemWithinArray,
  insertItemIntoArray,
  removeMaliciousTags,
  getDaysDiffBetweenDates,
};
