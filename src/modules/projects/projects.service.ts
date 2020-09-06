import { Injectable } from '@nestjs/common';
import { Project } from './interfaces/project.interface';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { DatabaseService } from '../database/database.service';
import { EntityNames } from '../../enums/entity-names.enum';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  remove(projectId: number): { project: Project; tasks: any[] } {
    const removedProject = this.databaseService.removeById<Project>(
      EntityNames.Project,
      projectId,
    );

    // TODO: implement removal of related tasks

    return { project: removedProject, tasks: [] };
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
