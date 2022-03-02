import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DEFAULT_LIMIT } from '../constants/common.constant';

@Injectable()
export class Service<E, R extends Repository<E>> {
  constructor(private readonly repository: R) {}

  async findOne(options?: FindOneOptions<E>): Promise<Partial<E>> {
    const record = await this.repository.findOne(options);

    if (!record) {
      throw new NotFoundException(
        `No record with ${JSON.stringify(options?.where || {})} not found`,
      );
    }

    return record;
  }

  async findList(options?: FindManyOptions<E>): Promise<Partial<E>[]> {
    return this.repository.find(options);
  }

  async count(options: FindManyOptions<E>): Promise<number> {
    return this.repository.count(options);
  }
}
