import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AuthTokenOutputDto } from '../dtos/auth-token-output.dto';
import { User } from '../../user/user.entity';
import { plainToClass } from 'class-transformer';
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
} from '../../../configuration/env';
import { RegisterInput } from '../dtos/register-input.dto';
import { UserOutput } from '../../user/dtos/user-output.dto';
import { RegisterOutputDto } from '../dtos/register-output.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = this.userService.validateUsernamePassword(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  async login(user: Partial<User>): Promise<AuthTokenOutputDto> {
    return this.getAuthToken(user);
  }

  async register(input: RegisterInput): Promise<RegisterOutputDto> {
    const user = await this.userService.createUser(input);

    return {
      user: plainToClass(UserOutput, user),
      ...this.getAuthToken(user),
    };
  }

  getAuthToken(user: Partial<User>): AuthTokenOutputDto {
    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return plainToClass(AuthTokenOutputDto, {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
      }),
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
      }),
    });
  }
}
