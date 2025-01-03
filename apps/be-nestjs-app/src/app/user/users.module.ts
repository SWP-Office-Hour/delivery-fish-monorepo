import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtUtilsModule } from '../utils/jwt/jwtUtils.module';
import { UsersController } from '../users/users.controller';

@Module({
  imports: [JwtUtilsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
