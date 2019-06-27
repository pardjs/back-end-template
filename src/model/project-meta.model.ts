import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model';
import { ProjectMeta } from './project-meta.entity';

@Injectable()
export class ProjectMetaModel extends Model<ProjectMeta> {
  constructor(
    @InjectRepository(ProjectMeta)
    protected repository: Repository<ProjectMeta>
  ) {
    super(repository);
  }
}
