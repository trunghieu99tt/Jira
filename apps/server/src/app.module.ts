import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './configuration/config-module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardModule } from './modules/board/board.module';
import { CommentModule } from './modules/comment/comment.module';
import { FileModule } from './modules/file/file.module';
import { LabelModule } from './modules/label/label.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskLabelModule } from './modules/task-label/task-label.module';
import { TaskModule } from './modules/task/task.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { OrmModule } from './orm.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    OrmModule,
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
    TaskLabelModule,
    LabelModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
