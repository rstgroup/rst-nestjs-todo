import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus } from './enums/task-status.enum';
import { TaskFiltersInterface } from './interfaces/task-filters.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  @Patch(':taskId')
  patchTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() data: UpdateTaskDto,
  ) {
    return this.tasksService.patch(taskId, data);
  }

  @Get()
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
  removeTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.remove(taskId);
  }
}
