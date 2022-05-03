import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), FileModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
