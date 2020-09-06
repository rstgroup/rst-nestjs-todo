import { Injectable } from '@nestjs/common';
import { Project } from './interfaces/project.interface';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { DatabaseService } from '../database/database.service';
import { EntityNames } from '../../enums/entity-names.enum';
import { Task } from '../tasks/interfaces/task.interface';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tasksService: TasksService,
  ) {}

  create(data: CreateProjectDto): Project {
    return this.databaseService.save<Project>(EntityNames.Project, data);
  }

  patch(projectId: number, data: UpdateProjectDto): Project {
    return this.databaseService.updateById<Project>(
      EntityNames.Project,
      projectId,
      data,
    );
  }

  remove(projectId: number): { project: Project; tasks: Task[] } {
    const removedProject = this.databaseService.removeById<Project>(
      EntityNames.Project,
      projectId,
    );

    let tasksToRemove = [];

    if (removedProject) {
      tasksToRemove = this.tasksService.getAll({ projectId });
      tasksToRemove.forEach(taskToRemove =>
        this.tasksService.remove(taskToRemove.id),
      );
    }

    return { project: removedProject, tasks: tasksToRemove };
  }

  getAll(): Project[] {
    return this.databaseService.findAll<Project>(EntityNames.Project);
  }

  getById(projectId: number): Project | null {
    return this.databaseService.findById<Project>(
      EntityNames.Project,
      projectId,
    );
  }
}
