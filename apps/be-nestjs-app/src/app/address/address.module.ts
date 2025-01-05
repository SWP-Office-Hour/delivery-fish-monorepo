import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, DatabaseService],
})
export class AddressModule {}
