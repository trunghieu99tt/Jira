import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { User } from '../../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    console.log('request', req);
    console.log('username', username);
    console.log('password', password);
    return this.authService.validateUser(username, password);
  }
}
