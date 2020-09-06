import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRole } from './enums/user-role.enum';

const users: User[] = [
    {
        id: 1,
        token: 'user',
        roles: [UserRole.User],
    },
    {
        id: 2,
        token: 'admin',
        roles: [UserRole.User, UserRole.Admin],
    },
];

@Injectable()
export class AuthenticationService {
    authenticate(token: string) {
        return users.find((user) => user.token === token);
    }
}
