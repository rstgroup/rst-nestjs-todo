import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './interfaces/project.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() data: CreateProjectDto): Project {
    return this.projectsService.create(data);
  }

  @Patch(':projectId')
  patchProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() data: UpdateProjectDto,
  ): Project {
    return this.projectsService.patch(projectId, data);
  }

  @Get()
  getProjects(): Project[] {
    return this.projectsService.getAll();
  }

  @Delete(':projectId')
  removeProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): { project: Project; tasks: any[] } {
    return this.projectsService.remove(projectId);
  }
}
