import { forwardRef, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AppModule } from '../../app.module';

@Module({
    imports: [forwardRef(() => AppModule)],
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
