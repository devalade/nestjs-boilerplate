import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role)
    private roleReporsitory: Repository<Role>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const rolesResult = await this.roleReporsitory.find({
      where: {
        id: In(roles),
      },
    });

    return this.checkRoles(request.user?.role?.id, rolesResult);
  }

  // Install Lodash
  private checkRoles(roleId: string, roles: Role[]): boolean {
    if (roleId == null) {
      return false;
    }
    const hasOneRole = roles.filter((role) => role.id != roleId);
    return Boolean(hasOneRole.length > 0);
  }
}
