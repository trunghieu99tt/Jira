import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { AuthTokenOutputDto } from './dtos/auth-token-output.dto';
import { UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  @UseGuards(LocalGuard)
  async login(@CurrentUser() user: Partial<User>): Promise<AuthTokenOutputDto> {
    return this.authService.login(user);
  }
}
