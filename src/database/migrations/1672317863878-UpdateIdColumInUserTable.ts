import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIdColumInUserTable1672317863878
  implements MigrationInterface
{
  name = 'UpdateIdColumInUserTable1672317863878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "PK_087959f5bb89da4ce3d763eab75"`,
    );
    await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "forgot" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "forgot" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "PK_087959f5bb89da4ce3d763eab75"`,
    );
    await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "forgot" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
