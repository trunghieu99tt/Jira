import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './configuration/config-module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { BoardModule } from './modules/board/board.module';
import { ProjectModule } from './modules/project/project.module';
import { CommentModule } from './modules/comment/comment.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
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
        };
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          playground: configService.get<boolean>('graphql.playground'),
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        };
      },
    }),
    TaskModule,
    AttachmentModule,
    ProjectModule,
    BoardModule,
    CommentModule,
    TaskModule,
    UserModule,
    FileModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
