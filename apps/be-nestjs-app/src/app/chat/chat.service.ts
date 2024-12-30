import { Injectable } from '@nestjs/common';
import { JoinChat, SendMess } from '@delivery-fish-monorepo/contract';

@Injectable()
export class ChatService {
  listAcc: string[] = [];

  create(createChatDto: SendMess) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: JoinChat) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  join(username: string) {
    this.listAcc.push(username);
    return this.listAcc;
  }
}
