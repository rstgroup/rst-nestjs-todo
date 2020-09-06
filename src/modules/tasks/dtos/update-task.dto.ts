import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto {
  readonly name?: string;

  readonly description?: string;

  readonly priority?: TaskPriority;

  readonly status?: TaskStatus;

  readonly projectId?: number | null;
}
