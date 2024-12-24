/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';
import { user } from '../../contract/user.contract';
import { test } from '../../contract/test.contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = generateOpenApi({ user ,test}, {
    info: {
      title: 'Posts API',
      version: '1.0.0',
    },
  });
  SwaggerModule.setup('/api', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
