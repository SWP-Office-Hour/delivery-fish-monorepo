import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { user } from '../../contract/user.contract';
import { SwaggerModule } from '@nestjs/swagger';
import { SocketIoAdapter } from './socket-io.adapter';
import { test } from '../../contract/test.contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Combine contracts
  const apiDocument = generateOpenApi(
    {
      user: user,
      test: test,
    },
    {
      info: {
        title: 'Your API',
        description: 'API description including WebSocket endpoints',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:3000` }],
    }
  );

  SwaggerModule.setup('api', app, apiDocument);
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
