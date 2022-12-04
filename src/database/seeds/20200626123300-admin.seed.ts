import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { plainToClass } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const adminRole = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."code" = :code', { code: RoleEnum.Admin })
      .getOne();

    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."roleId" = :roleId', { roleId: adminRole.id })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@example.com',
            password: 'secret',
            role: {
              id: adminRole.id,
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        ])
        .execute();
    }
  }
}
