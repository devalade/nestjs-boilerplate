import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin' })
  @Column({ unique: true })
  code?: string;

  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;
}
