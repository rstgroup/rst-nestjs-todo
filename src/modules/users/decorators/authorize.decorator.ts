import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { AllowedRoles } from './allowed-roles.decorator';

export function Authorize(...roles: UserRole[]) {
    return applyDecorators(AllowedRoles(...roles), UseGuards(AuthGuard));
}
