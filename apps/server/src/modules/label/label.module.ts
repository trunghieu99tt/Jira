import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelRepository } from './label.repository';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LabelRepository])],
  providers: [LabelService, LabelResolver],
  exports: [LabelService],
})
export class LabelModule {}
