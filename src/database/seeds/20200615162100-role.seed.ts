import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countGuru = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."code" = :code', { code: RoleEnum.Guru })
      .getCount();

    if (countGuru === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ code: RoleEnum.Guru, name: 'Guru' }])
        .execute();
    }

    const countSuperAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."code" = :code', { code: RoleEnum.SuperAdmin })
      .getCount();

    if (countSuperAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ code: RoleEnum.SuperAdmin, name: 'SuperAdmin' }])
        .execute();
    }

    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."code" = :code', { code: RoleEnum.User })
      .getCount();

    if (countUser === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ code: RoleEnum.User, name: 'User' }])
        .execute();
    }

    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."code" = :code', { code: RoleEnum.Admin })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ code: RoleEnum.Admin, name: 'Admin' }])
        .execute();
    }
  }
}
