import { AddressEntity } from './entities/address.entity';
import { Injectable } from '@nestjs/common';

import {
  CreateAddressRequest,
  UpdateAddressRequest,
} from '@delivery-fish-monorepo/contract';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AddressService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateAddressRequest) {
    const address = new AddressEntity(data);
    return this.databaseService.Address.create({
      data: address,
    });
  }

  async getAll() {
    return this.databaseService.Address.findMany();
  }

  async update(id: string, data: Partial<UpdateAddressRequest>) {
    return this.databaseService.Address.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date().toISOString(),
      },
    });
  }

  async findById(id: string) {
    return this.databaseService.Address.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.databaseService.Address.delete({
      where: { id },
    });
  }
}
