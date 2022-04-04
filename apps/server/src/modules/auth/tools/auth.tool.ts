import * as crypto from 'crypto';

export class AuthTool {
  static randomToken(length = 10): string {
    const byte = Math.ceil(length / 2);
    const res = crypto.randomBytes(byte).toString('hex');

    return length & 1 ? res.slice(0, -1) : res;
  }
}
