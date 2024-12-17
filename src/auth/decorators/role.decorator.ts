import { SetMetadata } from '@nestjs/common';
import { Role } from '../../enum/role.enum';

export const META_ROLES = 'role';
export const Roles = (role: Role) => SetMetadata(META_ROLES, role);