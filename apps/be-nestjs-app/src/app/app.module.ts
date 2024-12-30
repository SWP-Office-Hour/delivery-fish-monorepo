import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtUtilsModule } from './utils/jwt/jwtUtils.module';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
