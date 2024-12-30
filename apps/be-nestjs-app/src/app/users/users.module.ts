import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtUtilsModule } from '../utils/jwt/jwtUtils.module';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [JwtUtilsModule],
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
})
export class UsersModule {}
