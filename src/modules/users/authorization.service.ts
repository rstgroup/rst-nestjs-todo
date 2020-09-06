import { Injectable } from '@nestjs/common';
import { UserRole } from './enums/user-role.enum';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthorizationService {
    isAuthorized(user: User, roles: UserRole[] = []): boolean {
        // user is not authenticated
        if (!user) {
            return false;
        }

        // the route doesn't require any specific role
        if (!roles || roles.length === 0) {
            return true;
        }

        // user doesn't have any role
        if (!user.roles || user.roles.length === 0) {
            return false;
        }

        // returns true, if finds at least one common role
        return roles.some((routeRole) => user.roles.includes(routeRole));
    }
}
