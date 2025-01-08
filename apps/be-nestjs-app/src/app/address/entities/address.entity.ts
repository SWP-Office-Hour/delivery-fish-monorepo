import { AddressType } from '@delivery-fish-monorepo/contract';

export class AddressEntity {
  id: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  address_detail: string;
  created_at: string;
  updated_at: string;

  constructor(addressData: AddressType) {
    this.id = addressData.id;
    this.country = addressData.country;
    this.province = addressData.province;
    this.district = addressData.district;
    this.ward = addressData.ward;
    this.address_detail = addressData.address_detail;
    this.created_at = addressData.created_at || new Date().toISOString();
    this.updated_at = addressData.updated_at || new Date().toISOString();
  }
}
