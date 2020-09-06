import { Entity } from '../../../interfaces/entity.interface';
import { UserRole } from '../enums/user-role.enum';

export interface User extends Entity {
    token: string;
    roles: UserRole[];
}
