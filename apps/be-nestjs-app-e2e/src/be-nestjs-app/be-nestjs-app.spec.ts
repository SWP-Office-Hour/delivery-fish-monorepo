import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from '../../../be-nestjs-app/src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Replace with your app's root module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer()).get('/').expect(200).expect({
      message: 'Hello API',
    });
  });
});
