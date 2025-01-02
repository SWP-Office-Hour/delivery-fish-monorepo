import { Module } from '@nestjs/common';
import {
  AccessTokenAuthGuard,
  EmailVerifyTokenAuthGuard,
  RefreshTokenAuthGuard,
  RoleAuthGuard,
} from './auth.guard';
import { JwtUtilsModule } from '../utils/jwt/jwtUtils.module';
import { JwtUtilsService } from '../utils/jwt/jwtUtils.service';

@Module({
  imports: [JwtUtilsModule],
  providers: [
    AccessTokenAuthGuard,
    RoleAuthGuard,
    EmailVerifyTokenAuthGuard,
    RefreshTokenAuthGuard,
    JwtUtilsService,
  ],
})
export class AuthModule {}
