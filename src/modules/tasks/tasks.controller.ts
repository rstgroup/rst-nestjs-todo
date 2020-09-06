import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus } from './enums/task-status.enum';
import { TaskFiltersInterface } from './interfaces/task-filters.interface';
import { UserRole } from '../users/enums/user-role.enum';
import { Authorize } from '../users/decorators/authorize.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Authorize(UserRole.User, UserRole.Admin)
  createTask(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  @Patch(':taskId')
  @Authorize(UserRole.User, UserRole.Admin)
  patchTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() data: UpdateTaskDto,
  ) {
    return this.tasksService.patch(taskId, data);
  }

  @Get()
  @Authorize(UserRole.User, UserRole.Admin)
  getTasks(
    @Query('status') status: TaskStatus,
    @Query('projectId') projectId: string | undefined,
  ) {
    const filters: TaskFiltersInterface = { status };

    if (projectId) {
      filters.projectId = projectId === 'null' ? null : parseInt(projectId);
    }

    return this.tasksService.getAll(filters);
  }

  @Delete(':taskId')
  @Authorize(UserRole.User, UserRole.Admin)
  removeTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.remove(taskId);
  }
}
