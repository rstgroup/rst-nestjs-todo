import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { UserRole } from '../enums/user-role.enum';
import { Reflector } from '@nestjs/core';
import { UserRequest } from '../interfaces/user-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authorizationService: AuthorizationService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<UserRequest>();
        const roles = this.getMetadata<UserRole[]>(context, 'roles');

        return this.authorizationService.isAuthorized(request.user, roles);
    }

    getMetadata<T>(context: ExecutionContext, key: string): T {
        return this.reflector.get<T>(key, context.getHandler());
    }
}
