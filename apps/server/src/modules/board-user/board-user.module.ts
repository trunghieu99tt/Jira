import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { BoardUserRepository } from './board-user.repository';
import { BoardUserResolver } from './board-user.resolver';
import { BoardUserService } from './board-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardUserRepository]), UserModule],
  providers: [BoardUserService, BoardUserResolver],
  exports: [BoardUserService, BoardUserResolver],
})
export class BoardUserModule {}
