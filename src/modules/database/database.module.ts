import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AppModule } from '../../app.module';

@Module({
    imports: [AppModule],
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
