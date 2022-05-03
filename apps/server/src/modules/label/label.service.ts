import { Injectable } from '@nestjs/common';
import { LabelRepository } from './lable.repository';
import { Service } from '../../common/generics/service.generic';
import { Label } from './label.entity';
import { CreateLabelInputDto } from './dtos/create-label-input.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LabelService extends Service<Label, LabelRepository> {
  constructor(repository: LabelRepository) {
    super(repository);
  }

  async createLabel(input: CreateLabelInputDto): Promise<Label> {
    const { name } = input;
    const existingLabel = await this.repository.findOne({ name });
    if (existingLabel) {
      throw new Error('Label already exists');
    }
    return this.repository.save(plainToClass(Label, input));
  }
}
