import * as path from 'path';
import { Module } from '@nestjs/common';
import { DATABASE_PATH } from './modules/database/constants/database-path.constant';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { IsProjectIdValidConstraint } from './modules/tasks/validators/is-project-id-valid.validator';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './exception-filters/validation.exception-filter';
import { HttpExceptionFilter } from './exception-filters/http.exception-filter';

@Module({
  imports: [ProjectsModule, TasksModule],
  controllers: [],
  providers: [
    {
      provide: DATABASE_PATH,
      useValue: path.join(__dirname, '../../todo-database'),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    IsProjectIdValidConstraint,
  ],
  exports: [DATABASE_PATH],
})
export class AppModule {}
