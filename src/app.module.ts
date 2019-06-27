import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ControllerModule]
})
export class AppModule {}
