import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { DatabaseService } from '../database/database.service';
import { JwtUtilsModule } from '../utils/jwt/jwtUtils.module';
import { OrderService } from './order.service';

@Module({
  imports: [JwtUtilsModule],
  controllers: [OrderController],
  providers: [OrderService, DatabaseService],
})
export class OrderModule {}
