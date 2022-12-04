import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  public getAllRoleHandler() {
    return this.roleRepository.find();
  }

  public getRoleByCodeHandler(code: string) {
    return this.roleRepository.findOne({
      where: { code },
    });
  }
}
