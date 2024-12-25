import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinChat, SendMess } from '../../../contract/chat.contract';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chatMessage')
  chatMessage(@MessageBody() sendMessDto: SendMess , @ConnectedSocket() client: Socket)  {
    console.log(sendMessDto);
    console.log(client.id)

    this.server.emit('chatCreated', sendMessDto);
    // sendMessDto.content = 'Server: ' + "Hello " + sendMessDto.username + "!";
    // console.log(sendMessDto);
    // client.emit('chatCreated', sendMessDto);
    // return { event: 'chatCreated', data: sendMessDto };
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    console.log('findAllChat');
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: string) {
    console.log('findOneChat');
    this.server.emit('findOneChat', id);
    return id;
  }

  @ApiOperation({ summary: 'Join chat' })
  @SubscribeMessage('join')
  join(@MessageBody() joinChatDto: JoinChat) {
    console.log('join chat at BE:  ' + joinChatDto.username);
    this.server.emit('joinChat', this.chatService.join(joinChatDto.username));
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
