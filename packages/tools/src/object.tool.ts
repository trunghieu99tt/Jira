export class ObjectTool {
  static omit(obj: any, keys: string[]): any {
    const result = { ...obj };
    keys.forEach((key) => {
      delete result[key];
    });
    return result;
  }

  static pick(obj: any, keys: string[]): any {
    const result: {
      [key: string]: any;
    } = {};
    keys.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    });
    return result;
  }

  static get(obj: any, key: string, defaultValue?: any): any {
    return key in obj && obj[key] ? obj[key] : defaultValue;
  }

  static mapValues(obj: any, fn: (value: any) => any): any {
    const result: {
      [key: string]: any;
    } = {};
    Object.keys(obj).forEach((key) => {
      result[key] = fn(obj[key]);
    });
    return result;
  }
}
