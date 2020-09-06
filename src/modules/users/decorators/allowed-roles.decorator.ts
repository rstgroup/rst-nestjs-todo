import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';

export const AllowedRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
