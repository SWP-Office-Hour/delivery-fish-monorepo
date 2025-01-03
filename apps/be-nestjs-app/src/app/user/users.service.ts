import { Injectable } from '@nestjs/common';
import { UserType } from '@delivery-fish-monorepo/contract';

@Injectable()
export class UsersService {
  private users: UserType[] = [{ id: '1', name: 'John Doe' }];

  create(createUserDto: UserType): UserType {
    const newUser: UserType = { ...createUserDto, id: Date.now().toString() };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): UserType[] {
    console.log('findAll service');
    console.log(this.users);
    return this.users;
  }

  findOne(id: string): UserType | null {
    return this.users.find((user) => user.id === id) || null;
  }
}
