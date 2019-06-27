import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../service/app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();
  });

  describe('ping', () => {
    it('should return "pong"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.ping()).toBe('pong');
    });
  });
});
