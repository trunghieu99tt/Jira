export class StringTool {
  static makeId(length: number): string {
    let res = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      res += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return res;
  }
}
