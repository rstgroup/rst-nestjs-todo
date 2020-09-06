import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './interfaces/project.interface';
import { Task } from '../tasks/interfaces/task.interface';
import { UserRole } from '../users/enums/user-role.enum';
import { Authorize } from '../users/decorators/authorize.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Authorize(UserRole.Admin)
  createProject(@Body() data: CreateProjectDto): Project {
    return this.projectsService.create(data);
  }

  @Patch(':projectId')
  @Authorize(UserRole.Admin)
  patchProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() data: UpdateProjectDto,
  ): Project {
    return this.projectsService.patch(projectId, data);
  }

  @Get()
  @Authorize(UserRole.User, UserRole.Admin)
  getProjects(): Project[] {
    return this.projectsService.getAll();
  }

  @Delete(':projectId')
  @Authorize(UserRole.Admin)
  removeProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): { project: Project; tasks: Task[] } {
    return this.projectsService.remove(projectId);
  }
}
