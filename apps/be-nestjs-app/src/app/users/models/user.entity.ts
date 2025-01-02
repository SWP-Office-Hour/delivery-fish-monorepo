import {
  UserType,
  UserRole,
  UserRoleSchema,
  UserStatus,
  UserStatusSchema,
} from '@delivery-fish-monorepo/contract';

export class UserEntity {
  id?: string;
  name: string;
  phone: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  role: UserRole;
  status: UserStatus;

  constructor(userData: UserType) {
    this.id = userData.id;
    this.name = userData.name;
    this.phone = userData.phone;
    this.password = userData.password;
    this.created_at = userData.created_at || new Date();
    this.updated_at = userData.updated_at || new Date();
    this.role = userData.role || UserRoleSchema.enum.USER;
    this.status = userData.status || UserStatusSchema.enum.ACTIVE;
  }
}

/*
id?: string
name: string
phone: string
password: string
created_at: Date | string
updated_at: Date | string
role: number
status: number
*/
