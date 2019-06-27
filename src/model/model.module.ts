import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMeta } from './project-meta.entity';
import { ProjectMetaModel } from './project-meta.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMeta])],
  providers: [ProjectMetaModel],
  exports: [ProjectMetaModel]
})
export class ModelModule {}
