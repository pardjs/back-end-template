import { Injectable } from '@nestjs/common';
import { ProjectMetaModel } from '../model/project-meta.model';

@Injectable()
export class AppService {
  constructor(private readonly projectMetaModel: ProjectMetaModel) {}

  getDbConnected() {
    return {
      'project-meta': this.projectMetaModel.connected()
      // add other model if not in the same instance
      // add other services if have
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
