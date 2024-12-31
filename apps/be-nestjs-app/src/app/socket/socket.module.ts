import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtUtilsModule } from '../utils/jwt/jwtUtils.module';

@Module({
  imports: [JwtUtilsModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
