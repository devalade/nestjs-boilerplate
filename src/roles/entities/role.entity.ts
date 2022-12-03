import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;
}
