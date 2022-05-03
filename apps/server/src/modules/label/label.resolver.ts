import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Label } from './label.entity';
import { LabelService } from './label.service';
import { CreateLabelInputDto } from './dtos/create-label-input.dto';

@Resolver(() => Label)
export class LabelResolver {
  constructor(private readonly labelService: LabelService) {}

  @Query(() => [Label])
  async labels(): Promise<Partial<Label>[]> {
    return this.labelService.findList({});
  }

  @Mutation(() => Label)
  async createLabel(
    @Args('createLabelInput') input: CreateLabelInputDto,
  ): Promise<Partial<Label>> {
    return this.labelService.createLabel(input);
  }
}
