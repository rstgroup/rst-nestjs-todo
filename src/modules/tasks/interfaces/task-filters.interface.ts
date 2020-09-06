import { TaskStatus } from '../enums/task-status.enum';

export interface TaskFiltersInterface {
    projectId?: number | null;
    status?: TaskStatus;
}
