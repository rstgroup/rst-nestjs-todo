import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

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
  getTasks() {
    return this.tasksService.getAll();
  }

  @Delete(':taskId')
  removeTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.remove(taskId);
  }
}
