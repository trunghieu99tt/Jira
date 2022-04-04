import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { JWT_SECRET } from '../../configuration/env';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt-auth',
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_SECRET,
      }),
    }),
    UserModule,
    HttpModule,
  ],
  providers: [JwtStrategy, LocalStrategy, AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
