import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import {
  payosContract,
  authContract,
  orderContract,
  addressContract,
  fileContract,
} from '@delivery-fish-monorepo/contract';
import { SwaggerModule } from '@nestjs/swagger';
import { SocketIoAdapter } from './socket-io.adapter';
import { testContract } from '@delivery-fish-monorepo/contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Combine contracts
  const apiDocument = generateOpenApi(
    {
      // user: userContract,
      auth: authContract,
      // test: testContract,
      test: testContract,
      payos: payosContract,
      order: orderContract,
      address: addressContract,
      file: fileContract,
    },
    {
      info: {
        title: 'Office Hour API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      // Apply security globally
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [{ url: `${process.env.HOST_URL}` }],
    }
  );

  SwaggerModule.setup('api', app, apiDocument);
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  console.log('hi from ' + process.env.HOST_URL);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${process.env.HOST_URL}`);
}

bootstrap();
