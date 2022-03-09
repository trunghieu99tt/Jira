import { EntityRepository, Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@EntityRepository(File)
export class FileRepository extends Repository<File> {}
