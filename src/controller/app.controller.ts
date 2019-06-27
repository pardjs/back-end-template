import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  private projectInfo: any;
  constructor(private readonly appService: AppService) {
    this.projectInfo = JSON.parse(
      readFileSync(joinPath(process.cwd(), 'project-info.json')).toString('utf8')
    );
  }

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Get('health')
  health() {
    return {
      db: this.appService.getDbConnected()
    };
  }

  @Get('info')
  info() {
    return this.projectInfo;
  }
}
