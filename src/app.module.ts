import * as path from 'path';
import { Module } from '@nestjs/common';
import { DATABASE_PATH } from './modules/database/constants/database-path.constant';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [ProjectsModule, TasksModule],
  controllers: [],
  providers: [
    {
      provide: DATABASE_PATH,
      useValue: path.join(__dirname, '../../todo-database'),
    },
  ],
  exports: [DATABASE_PATH],
})
export class AppModule {}
