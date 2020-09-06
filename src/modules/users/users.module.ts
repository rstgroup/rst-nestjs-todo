import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthorizationService } from './authorization.service';

@Module({
    imports: [],
    controllers: [],
    providers: [AuthenticationService, AuthorizationService],
    exports: [AuthenticationService, AuthorizationService],
})
export class UsersModule {}
