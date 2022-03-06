export class StringTool {
  static removeAccents(str: string): string {
    if (!str) {
      return '';
    }
    return str
      .toString()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/đ/g, 'd')
      .replace(/\s/g, '');
  }

  static normalizeFileName(filename: string): string {
    return this.removeAccents(filename).replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      '',
    );
  }
}
