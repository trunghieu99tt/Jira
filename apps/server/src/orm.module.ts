import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AttachmentRepository } from './modules/attachment/attachment.repository';
import { CommentRepository } from './modules/comment/comment.repository';
import { FileRepository } from './modules/file/repositories/file.repository';
import { ProjectUserRepository } from './modules/project-user/repositories/project-user.repository';
import { TaskRepository } from './modules/task/task.repository';
import { UserRepository } from './modules/user/user.repository';

initializeTransactionalContext(); // Initialize cls-hooked
patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number | undefined>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          entities: [join(__dirname, '**/**/**.entity{.ts,.js}')],
          timezone: 'Z',
          synchronize: false,
          connectTimeout: 100000,
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([
      TaskRepository,
      AttachmentRepository,
      UserRepository,
      FileRepository,
      CommentRepository,
      ProjectUserRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class OrmModule {}
