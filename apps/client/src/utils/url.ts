import queryString from 'query-string';
import { ObjectTool } from 'tools';

export const queryStringToObject = (qs: string, options = {}) =>
  queryString.parse(qs, {
    arrayFormat: 'bracket',
    ...options,
  });

export const objectToQueryString = (obj: any, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  });

export const omitFromQueryString = (qs: string, keys: string[]) =>
  objectToQueryString(ObjectTool.omit(queryStringToObject(qs), keys));

export const appendToQueryString = (qs: string, fields: any) =>
  objectToQueryString({
    ...queryStringToObject(qs),
    ...fields,
  });
