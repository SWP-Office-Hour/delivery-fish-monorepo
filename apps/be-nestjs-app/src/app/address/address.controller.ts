// apps/be-nestjs-app/src/app/address/address.controller.ts
import { Body, Controller } from '@nestjs/common';

import {
  addressContract,
  CreateAddressRequest,
} from '@delivery-fish-monorepo/contract';
import { AddressService } from './address.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @TsRestHandler(addressContract.create)
  async create(@Body() body: CreateAddressRequest) {
    return tsRestHandler(addressContract.create, async () => {
      const address = await this.addressService.create(body);
      return { status: 201, body: address };
    });
  }

  @TsRestHandler(addressContract.getAll)
  async getAll() {
    return tsRestHandler(addressContract.getAll, async () => {
      const addresses = await this.addressService.getAll();
      return { status: 200, body: addresses };
    });
  }

  //
  // @TsRestHandler(c.update)
  // async update(
  //   @TsRestHandler() { params: { id }, body }: { params: { id: string }; body: typeof c.update.body }
  // ) {
  //   try {
  //     const address = await this.addressService.update(id, body);
  //     if (!address) {
  //       return {
  //         status: 404 as const,
  //         body: { message: 'Address not found' },
  //       };
  //     }
  //     return {
  //       status: 200 as const,
  //       body: address,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 400 as const,
  //       body: { message: error.message },
  //     };
  //   }
  // }
  //
  // @TsRestHandler(c.getById)
  // async getById(
  //   @TsRestHandler() { params: { id } }: { params: { id: string } }
  // ) {
  //   const address = await this.addressService.findById(id);
  //   if (!address) {
  //     return {
  //       status: 404 as const,
  //       body: { message: 'Address not found' },
  //     };
  //   }
  //   return {
  //     status: 200 as const,
  //     body: address,
  //   };
  // }
  //
  // @TsRestHandler(c.delete)
  // async delete(
  //   @TsRestHandler() { params: { id } }: { params: { id: string } }
  // ) {
  //   try {
  //     await this.addressService.delete(id);
  //     return {
  //       status: 200 as const,
  //       body: { message: 'Address deleted successfully' },
  //     };
  //   } catch (error) {
  //     return {
  //       status: 404 as const,
  //       body: { message: 'Address not found' },
  //     };
  //   }
  // }
}
