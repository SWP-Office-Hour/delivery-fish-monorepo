import { Injectable } from '@nestjs/common';
import { User } from '../../../contract/user.contract';

@Injectable()
export class UserService {
  private users: User[] = [{ id: '1', name: 'John Doe' }];

  create(createUserDto: User): User {
    const newUser: User = { ...createUserDto, id: Date.now().toString() };
    this.users.push(newUser);
    return newUser;
  }

   findAll(): User[] {
    console.log('findAll service');
    console.log(this.users);
    return this.users;
  }

  findOne(id: string): User | null {
    return this.users.find(user => user.id === id) || null;
  }
}
