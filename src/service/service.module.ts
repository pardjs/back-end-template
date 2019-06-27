import { Module } from '@nestjs/common';
import { ModelModule } from '../model/model.module';
import { AppService } from './app.service';

@Module({
  imports: [ModelModule],
  providers: [AppService],
  exports: [AppService]
})
export class ServiceModule {}
