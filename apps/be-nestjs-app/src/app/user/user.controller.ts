import {Body, Controller, Param, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userContract } from '@delivery-fish-monorepo/contract';
import { Request } from 'express';
import {AuthGuard} from "../auth/auth.guard";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @TsRestHandler(userContract.getAll)
  async getAll() {
    return tsRestHandler(userContract.getAll, async () => {
      const users = await this.userService.findAll();
      return { status: 200, body: users };
    });
  }

  @TsRestHandler(userContract.create)
  async post(@Body() body, @Req() req: Request) {
    return tsRestHandler(userContract.create, async ({ body }) => {
      const newUser = await this.userService.create(body);
      return { status: 201, body: newUser };
    });
  }

  @TsRestHandler(userContract.getOne)
  async getOne(@Param() params) {
    return tsRestHandler(userContract.getOne, async ({ params }) => {
      console.log('params', params);
      const user = await this.userService.findOne(params.id);
      if (user) {
        return { status: 200, body: user };
      }
      return { status: 404, body: { message: 'User not found' } };
    });
  }

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
}
