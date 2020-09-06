import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { DatabaseService } from '../database/database.service';
import { EntityNames } from '../../enums/entity-names.enum';
import { TaskStatus } from './enums/task-status.enum';
import { TaskFiltersInterface } from './interfaces/task-filters.interface';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: CreateTaskDto): Task {
    return this.databaseService.save<Task>(EntityNames.Task, {
      projectId: null,
      status: TaskStatus.New,
      ...data,
    });
  }

  patch(taskId: number, data: UpdateTaskDto): Task {
    return this.databaseService.updateById<Task>(
      EntityNames.Task,
      taskId,
      data,
    );
  }

  remove(taskId: number): Task {
    return this.databaseService.removeById<Task>(EntityNames.Task, taskId);
  }

  getAll(filters?: TaskFiltersInterface): Task[] {
    return this.databaseService.findAll<Task>(
      EntityNames.Task,
      filters && this.buildFilter(filters),
    );
  }

  private buildFilter = (filters: TaskFiltersInterface) => (task: Task) => {
    // accept filters.projectId = null, so that we can filter tasks, which aren't assigned to any project
    if (filters.projectId !== undefined && task.projectId !== filters.projectId) {
      return false;
    }

    if (filters.status && task.status !== filters.status) {
      return false;
    }

    return true;
  };
}
