import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../enum/role.enum';
import { RolesGuard } from '../guards/user-role.guard';
import { Roles } from './role.decorator';
import { AuthGuard } from '../guards/auth.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
