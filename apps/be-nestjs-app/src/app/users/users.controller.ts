import {
  Body,
  Controller,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import {
  authContract,
  LoginRequest,
  RegisterRequest,
  TokenRequest,
} from '@delivery-fish-monorepo/contract';
import {
  AccessTokenAuthGuard,
  RefreshTokenAuthGuard,
  RoleAuthGuard,
} from '../auth/auth.guard';
import { RequestWithJWT } from 'express';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //sử dung them middleware
  @TsRestHandler(authContract.login)
  async handleLogin(@Body() body: LoginRequest) {
    return tsRestHandler(authContract.login, async () => {
      const users = await this.usersService.login(body);
      return { status: 200, body: users };
    });
  }

  @TsRestHandler(authContract.register)
  async handleRegister(@Body() body: RegisterRequest) {
    return tsRestHandler(authContract.register, async () => {
      const phone = await this.usersService.checkPhone(body.phone);
      if (!phone) {
        const users = await this.usersService.register(body);
        return { status: 200, body: users };
      } else {
        return {
          status: 401,
          body: { message: 'Phone number is already registered' },
        };
      }
    });
  }

  @UseGuards(AccessTokenAuthGuard, RefreshTokenAuthGuard)
  @TsRestHandler(authContract.logout)
  async handleLogout(@Body() body: TokenRequest, @Req() req: RequestWithJWT) {
    return tsRestHandler(authContract.logout, async () => {
      const { user_id } = req.decoded_authorization;
      const { refresh_token } = body;
      const refresh_token_id = await this.usersService.checkRefreshToken({
        user_id,
        refresh_token,
      });
      if (!refresh_token_id) {
        throw new UnauthorizedException('Unauthorized Refresh Token');
      }
      await this.usersService.logout(refresh_token_id);
      return {
        status: 200,
        body: { message: 'Logout successfully' },
      };
    });
  }

  @UseGuards(RefreshTokenAuthGuard)
  @TsRestHandler(authContract.refreshToken)
  async handleRefreshToken(
    @Body() body: TokenRequest,
    @Req() req: RequestWithJWT
  ) {
    return tsRestHandler(authContract.refreshToken, async () => {
      const { user_id } = req.decoded_refresh_token;
      const { refresh_token } = body;
      const refresh_token_id = await this.usersService.checkRefreshToken({
        user_id,
        refresh_token,
      });
      if (!refresh_token_id) {
        throw new UnauthorizedException('Unauthorized Refresh Token');
      }
      const users = await this.usersService.refreshToken({
        refresh_token_id,
        user_id,
      });
      return { status: 200, body: users };
    });
  }

  //
  // @Post('register')
  // @ApiBody({
  //   type: RegisterReqBody,
  //   required: true,
  //   description: 'Register body',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Register successfully',
  //   schema: {
  //     example: {
  //       message: 'Register successfully',
  //       result: {
  //         access_token: 'access_token',
  //         refresh_token: 'refresh_token',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Phone number is already registered',
  //   schema: {
  //     example: {
  //       message: 'Email is already existed',
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request',
  //   schema: {
  //     example: {
  //       message: 'Bad request',
  //     },
  //   },
  // })
  // async register(@Body(new ValidationPipe()) body: RegisterReqBody) {
  //   const { phone } = body;
  //   const isExistedPhone = await this.usersService.checkPhone(phone);
  //   if (isExistedPhone) {
  //     return {
  //       message: 'Phone number is already registered',
  //     };
  //   }
  //   const result = await this.usersService.register(body);
  //   return {
  //     message: 'Register successfully',
  //     result,
  //   };
  // }
  //
  // @Post('login')
  // @ApiBody({
  //   type: LoginReqBody,
  //   required: true,
  //   description: 'Login body',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Login successfully',
  //   schema: {
  //     example: {
  //       message: 'Login successfully',
  //       result: {
  //         access_token: 'access_token',
  //         refresh_token: 'refresh_token',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request',
  //   schema: {
  //     example: {
  //       message: 'Bad request',
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Email or password is incorrect',
  //   schema: {
  //     example: {
  //       message: 'Email or password is incorrect',
  //     },
  //   },
  // })
  // async login(@Body(new ValidationPipe()) body: LoginReqBody) {
  //   const tokens = await this.usersService.login(body);
  //   if (!tokens) {
  //     throw new UnauthorizedException('Email or password is incorrect');
  //   }
  //   return {
  //     message: 'Login successfully',
  //     result: tokens,
  //   };
  // }
  //
  // @Get()
  // @ApiHeader({
  //   name: 'Authorization',
  //   required: true,
  //   description: 'Bearer token',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Get users successfully',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden',
  // })
  // @Roles(UserRole.ADMIN)
  // @UseGuards(AccessTokenAuthGuard, RoleAuthGuard)
  // async users() {
  //   const result = await this.usersService.users();
  //   return {
  //     message: 'Get users successfully',
  //     result,
  //   };
  // }
  //
  // @Post('logout')
  // @UseGuards(AccessTokenAuthGuard, RefreshTokenAuthGuard)
  // async logout(@Body() body: LogoutReqBody, @Req() req: RequestWithJWT) {
  //   const { user_id } = req.decoded_authorization;
  //   const { refresh_token } = body;
  //   const refresh_token_id = await this.usersService.checkRefreshToken({
  //     user_id,
  //     refresh_token,
  //   });
  //   if (!refresh_token_id) {
  //     throw new UnauthorizedException('Unauthorized Refresh Token');
  //   }
  //   await this.usersService.logout(refresh_token_id);
  //   return {
  //     message: 'Logout successfully',
  //   };
  // }
  //
  // @Post('refresh-token')
  // @UseGuards(RefreshTokenAuthGuard)
  // async refreshToken(
  //   @Body() body: RefreshTokenReqBody,
  //   @Req() req: RequestWithJWT
  // ) {
  //   const { user_id } = req.decoded_refresh_token;
  //   const { refresh_token } = body;
  //   const refresh_token_id = await this.usersService.checkRefreshToken({
  //     user_id,
  //     refresh_token,
  //   });
  //   if (!refresh_token_id) {
  //     throw new UnauthorizedException('Unauthorized Refresh Token');
  //   }
  //   const tokens = await this.usersService.refreshToken({
  //     refresh_token_id,
  //     user_id,
  //   });
  //   return {
  //     message: 'Refresh token successfully',
  //     result: tokens,
  //   };
  // }
}
