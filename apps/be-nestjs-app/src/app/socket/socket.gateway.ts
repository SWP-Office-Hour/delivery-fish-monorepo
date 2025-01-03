import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io';
import { Req, UseGuards } from '@nestjs/common';
import { IsLoggin } from '../auth/auth.guard';
import { RequestWithJWT } from 'express';
import { UserRole } from '@delivery-fish-monorepo/contract';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Socket;

  constructor(private readonly socketService: SocketService) {}

  @UseGuards(IsLoggin)
  handleConnection(
    @ConnectedSocket() client: Socket,
    @Req() req: RequestWithJWT
  ) {
    if (
      !req.decoded_authorization ||
      req.decoded_authorization.role == UserRole.CUSTOMER
    ) {
      this.socketService.handleConnectionForClient(client);
    } else {
      this.socketService.handleConnectionForStaff(client);
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.socketService.handleDisconnect(client);
  }

  @UseGuards(IsLoggin)
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
    @Req() req: RequestWithJWT
  ) {
    if (req.decoded_authorization.role == UserRole.CUSTOMER) {
      this.socketService.handleMessageFromClient(client, payload);
    } else {
      this.socketService.handleMessageFromStaff(client, payload);
    }
  }
}
