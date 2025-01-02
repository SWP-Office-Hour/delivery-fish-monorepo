// import {Body, Controller, Param, Req, UseGuards} from '@nestjs/common';
// import { UsersService } from './users.service';
// import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
// import { userContract } from '@delivery-fish-monorepo/contract';
// import { Request } from 'express';
// import { AccessTokenAuthGuard, RoleAuthGuard } from '../auth/auth.guard';
// import { Roles } from '../utils/decorators/role.decorator';
// import { UserRole } from '../users/models/user.entity';
//
// @Controller()
// export class UsersController {
//   constructor(private readonly userService: UsersService) {}
//
//   @UseGuards(AccessTokenAuthGuard)
//   //sử dung them middleware
//   @Roles(UserRole.ADMIN, UserRole.MANAGER)
//   @UseGuards(RoleAuthGuard)
//   @TsRestHandler(userContract.getAll)
//   async getAll() {
//     return tsRestHandler(userContract.getAll, async () => {
//       const users = await this.userService.findAll();
//       return { status: 200, body: users };
//     });
//   }
//
//   @TsRestHandler(userContract.create)
//   async post(@Body() body, @Req() req: Request) {
//     return tsRestHandler(userContract.create, async ({ body }) => {
//       const newUser = await this.userService.create(body);
//       return { status: 201, body: newUser };
//     });
//   }
//
//   @TsRestHandler(userContract.getOne)
//   async getOne(@Param() params) {
//     return tsRestHandler(userContract.getOne, async ({ params }) => {
//       console.log('params', params);
//       const user = await this.userService.findOne(params.id);
//       if (user) {
//         return { status: 200, body: user };
//       }
//       return { status: 404, body: { message: 'User not found' } };
//     });
//   }

// @TsRestHandler(user.User)
// async handler() {
//   return tsRestHandler(userContract.User, {
//     getAll: async () => {
//       const users = await this.userService.findAll();
//       return { status: 200, body: users };
//     },
//
//     testPost: async ({ body }) => {
//       const newUser = await this.userService.create(body);
//       return { status: 201, body: newUser };
//     },
//
//     getOne: async ({ params }) => {
//       const user = await this.userService.findOne(params.id);
//       if (user) {
//         return { status: 200, body: user };
//       }
//       return { status: 404, body: { message: 'User not found' } };
//     },
//   });
// }

// @Post()
// async create(@Body() createUserDto: User) {
//   const newUser = await this.userService.create(createUserDto);
//   return { status: 201, body: newUser };
// }

// @Get()
// async findAll() {
//   const users = await this.userService.findAll();
//   return { status: 200, body: users };
// }

// @Get(':id')
// async findOne(@Param('id') id: string) {
//   const user = await this.userService.findOne(id);
//   if (user) {
//     return { status: 200, body: user };
//   }
//   return { status: 404, body: { message: 'User not found' } };
// }
// }
