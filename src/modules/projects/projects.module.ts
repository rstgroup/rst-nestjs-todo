import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DatabaseModule } from '../database/database.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
