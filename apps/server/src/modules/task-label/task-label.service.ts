import { Injectable } from '@nestjs/common';
import { Service } from '../../common/generics/service.generic';
import { TaskLabelRepository } from './task-label.repository';
import { TaskLabel } from './task-label.entity';
import { LabelService } from '../label/label.service';
import { Label } from '../label/label.entity';
import { Connection, In } from 'typeorm';
import { TaskLabelOutput } from './dtos/task-label-output.dto';
import { plainToClass } from 'class-transformer';
import { UpdateTaskLabelsInputDto } from './dtos/update-task-labels-input.dto';

@Injectable()
export class TaskLabelService extends Service<TaskLabel, TaskLabelRepository> {
  constructor(
    repository: TaskLabelRepository,
    private readonly labelService: LabelService,
    private readonly connection: Connection,
  ) {
    super(repository);
  }

  async getTaskLabels(taskId: number): Promise<TaskLabelOutput[]> {
    const taskLabels = await this.repository.find({
      where: { taskId, isDeleted: false },
      select: ['labelId'],
    });
    const labelIds = taskLabels.map((taskLabel) => taskLabel.labelId);
    const labels = await this.labelService.findList({
      where: {
        id: In(labelIds),
      },
    });

    return plainToClass(
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

  async updateTaskLabels(input: UpdateTaskLabelsInputDto): Promise<boolean> {
    const { taskId, labelId } = input;

    return this.connection.transaction(async (manager) => {
      try {
        const taskLabel = await this.findOne({
          where: {
            taskId,
            labelId,
          },
        });

        console.log('taskLabel', taskLabel);
        if (!taskLabel) {
          await manager.insert(TaskLabel, {
            taskId,
            labelId,
          });
        } else {
          await manager.update(
            TaskLabel,
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
    });
  }
}
