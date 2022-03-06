import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'bigint',
    name: 'owner_id',
  })
  ownerId: number;

  @Column()
  driver: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column()
  type: string;

  @Column({
    name: 's3_key',
  })
  s3Key: string;

  @Column({
    name: 's3_bucket',
  })
  s3Bucket: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
