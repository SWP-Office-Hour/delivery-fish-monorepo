import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { userContract } from '@delivery-fish-monorepo/contract';
import { SwaggerModule } from '@nestjs/swagger';
import { SocketIoAdapter } from './socket-io.adapter';
import { testContract } from '@delivery-fish-monorepo/contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Combine contracts
  const apiDocument = generateOpenApi(
    {
      user: userContract,
      test: testContract,
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
