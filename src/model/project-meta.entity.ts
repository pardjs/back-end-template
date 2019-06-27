import { EntityParent } from '@pardjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProjectMeta extends EntityParent {
  @PrimaryColumn({ type: 'varchar', length: 32 })
  key!: string;

  @Column({ type: 'varchar', length: 32 })
  value!: string;
}
