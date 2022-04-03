import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt-auth',
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        signOptions: {
          algorithm: 'RS256',
        },
      }),
    }),
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
