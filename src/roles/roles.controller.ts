import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(public service: RolesService) {}

  @Get()
  public getAllRoles() {
    return this.service.getAllRoleHandler();
  }

  @Get('/:id')
  public getOneRole(@Param('id') id: string) {
    return this.service.getRoleByCodeHandler(id);
  }
}
