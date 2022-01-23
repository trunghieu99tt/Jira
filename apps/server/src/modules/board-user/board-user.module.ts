import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardUserRepository } from './board-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardUserRepository])],
})
export class BoardUserModule {}
