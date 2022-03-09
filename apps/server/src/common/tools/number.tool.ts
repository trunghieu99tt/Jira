export class NumberTool {
  static isStringNumber(value: string): boolean {
    return !isNaN(Number(value));
  }
}
