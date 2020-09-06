import * as path from 'path';
import { Module } from '@nestjs/common';
import { DATABASE_PATH } from './modules/database/constants/database-path.constant';

@Module({
  imports: [],
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
