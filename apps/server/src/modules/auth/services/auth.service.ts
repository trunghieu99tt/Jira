import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AuthTokenOutputDto } from '../dtos/auth-token-output.dto';
import { User } from '../../user/user.entity';
import { plainToInstance } from 'class-transformer';
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URL,
  GOOGLE_CLIENT_ID,
  JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
} from '../../../configuration/env';
import { RegisterInputDto } from '../dtos/register-input.dto';
import { RegisterOutputDto } from '../dtos/register-output.dto';
import { Connection } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';
import { HttpService } from '@nestjs/axios';
import { hash } from 'bcrypt';
import { AuthTool } from '../tools/auth.tool';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
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

  async register(input: RegisterInputDto): Promise<RegisterOutputDto> {
    try {
      const user = await this.userService.createUser(input);
      return this.getAuthToken(user);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  getAuthToken(user: Partial<User>): AuthTokenOutputDto {
    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return plainToInstance(AuthTokenOutputDto, {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
      }),
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
      }),
    });
  }

  async getOrCreateUserByEmail(input: {
    email: string;
    name: string;
  }): Promise<Partial<User>> {
    const { email, name } = input;
    const user = await this.userService.findOne({
      where: {
        email,
      },
      select: ['id', 'username'],
    });

    if (user) return user;

    const initialPassword = await hash(AuthTool.randomToken(10), 10);
    const newUser = plainToInstance(User, {
      username: `${email}-${new Date().getTime()}`,
      password: initialPassword,
      name,
      email,
    });
    return this.userService.createUser(newUser);
  }

  async getGoogleUserData(googleTokenId: string): Promise<any> {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const response = await client.verifyIdToken({
      idToken: googleTokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email_verified, email, given_name, family_name } = (response as any)
      .payload;
    if (!email_verified) {
      throw new BadRequestException('Google email is not verified');
    }

    return {
      email,
      name: `${given_name} ${family_name}`,
    };
  }

  async getGithubAccessToken(githubCode: string): Promise<string> {
    // get access token
    const payload = {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: githubCode,
      redirect_url: GITHUB_REDIRECT_URL,
    };
    const url = 'https://github.com/login/oauth/access_token';
    const responseToken = await firstValueFrom(
      this.httpService.post(url, payload),
    );
    const params = new URLSearchParams(responseToken.data);
    return params.get('access_token') || '';
  }

  async getGithubUserData(code: string): Promise<{
    email: string;
    name: string;
  }> {
    const accessToken = await this.getGithubAccessToken(code);
    if (!accessToken) {
      throw new Error('github access token is empty');
    }

    const githubUser = await firstValueFrom(
      this.httpService.get(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }),
    );

    const { email, name } = githubUser.data;
    return {
      email,
      name,
    };
  }

  async socialLogin(input: {
    token: string;
    provider: 'google' | 'github';
  }): Promise<AuthTokenOutputDto> {
    let userPayload = { name: '', email: '' };
    switch (input.provider) {
      case 'google':
        userPayload = await this.getGoogleUserData(input.token);
        break;
      case 'github':
        userPayload = await this.getGithubUserData(input.token);
        break;
    }

    const user = await this.getOrCreateUserByEmail(userPayload);
    return this.getAuthToken(user);
  }
}
