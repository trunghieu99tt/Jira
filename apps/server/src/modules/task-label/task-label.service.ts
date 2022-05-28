import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Service } from '../../common/generics/service.generic';
import { Label } from '../label/label.entity';
import { LabelRepository } from '../label/label.repository';
import { TaskLabelOutput } from './dtos/task-label-output.dto';
import { UpdateTaskLabelsInputDto } from './dtos/update-task-labels-input.dto';
import { TaskLabel } from './task-label.entity';
import { TaskLabelRepository } from './task-label.repository';

@Injectable()
export class TaskLabelService extends Service<TaskLabel, TaskLabelRepository> {
  constructor(
    repository: TaskLabelRepository,
    private readonly taskLabelRepository: TaskLabelRepository,
    private readonly labelRepository: LabelRepository,
  ) {
    super(repository);
  }

  async getTaskLabels(taskId: number): Promise<TaskLabelOutput[]> {
    const taskLabels = await this.repository.find({
      where: { taskId, isDeleted: false },
      select: ['labelId'],
    });
    const labelIds = taskLabels.map((taskLabel) => taskLabel.labelId);
    const labels = await this.labelRepository.find({
      where: {
        id: In(labelIds),
      },
    });

    return plainToInstance(
      TaskLabelOutput,
      labels.map((label: Partial<Label>) => {
        return {
          labelId: label.id,
          name: label.name,
          color: label.color,
        };
      }),
    );
  }

  @Transactional()
  async updateTaskLabels(input: UpdateTaskLabelsInputDto): Promise<boolean> {
    const { taskId, labelId } = input;

    try {
      const taskLabel = await this.findOne({
        where: {
          taskId,
          labelId,
        },
      });

      if (!taskLabel) {
        await this.taskLabelRepository.save(
          plainToInstance(TaskLabel, {
            taskId,
            labelId,
          }),
        );
      } else {
        await this.taskLabelRepository.update(
          {
            taskId,
            labelId,
          },
          {
            isDeleted: !taskLabel.isDeleted,
          },
        );
      }

      return true;
    } catch (error) {
      console.error('[updateTaskLabels] error', error);
      return false;
    }
  }
}
