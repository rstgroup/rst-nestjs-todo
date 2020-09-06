import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';
import { IsEnum, IsNumber, IsOptional, Length } from 'class-validator';
import { IsProjectIdValid } from '../validators/is-project-id-valid.validator';

export class UpdateTaskDto {
  @IsOptional()
  @Length(3, 100)
  readonly name?: string;

  @IsOptional()
  @Length(0, 300)
  readonly description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  readonly priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;

  @IsOptional()
  @IsNumber()
  @IsProjectIdValid()
  readonly projectId?: number | null;
}
