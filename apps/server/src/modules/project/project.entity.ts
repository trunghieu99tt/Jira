import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// enums
import { EPrivacy } from '../../common/enums';
import { Board } from '../board/board.entity';
import { ProjectUserOutput } from './dtos/project-user-output.dto';

registerEnumType(EPrivacy, {
  name: 'Privacy',
});

@Entity({
  name: 'projects',
})
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column({
    name: 'cover_photo_file_id',
    nullable: true,
    type: 'bigint',
  })
  coverPhotoFileId: number;

  @Field(() => EPrivacy)
  @Column({
    name: 'privacy',
    type: 'enum',
    enum: EPrivacy,
  })
  privacy: EPrivacy;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column({
    name: 'owner_user_id',
    type: 'bigint',
  })
  ownerUserId: number;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Field(() => [Board])
  boards: Board[];

  @Field(() => [ProjectUserOutput])
  projectUsers: ProjectUserOutput[];

  @Field(() => Number)
  userCount: number;

  @Field(() => String)
  coverPhotoUrl: string;
}
