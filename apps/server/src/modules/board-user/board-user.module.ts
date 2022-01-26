import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardUserRepository } from './board-user.repository';
import { BoardUserService } from './board-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardUserRepository])],
  providers: [BoardUserService],
  exports: [BoardUserService],
})
export class BoardUserModule {}
