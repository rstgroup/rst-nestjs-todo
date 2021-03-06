import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';
import { Entity } from '../../../interfaces/entity.interface';

export interface Task extends Entity {
  id: number;
  name: string;
  status: TaskStatus;
  description?: string;
  priority?: TaskPriority;
  projectId?: number;
}
