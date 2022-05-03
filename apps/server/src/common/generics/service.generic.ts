import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class Service<E, R extends Repository<E>> {
  constructor(protected readonly repository: R) {}

  async findOne(options?: FindOneOptions<E>): Promise<Partial<E> | undefined> {
    return this.repository.findOne(options);
  }

  async findList(options?: FindManyOptions<E>): Promise<Partial<E>[]> {
    return this.repository.find(options);
  }

  async count(options: FindManyOptions<E>): Promise<number> {
    return this.repository.count(options);
  }
}
