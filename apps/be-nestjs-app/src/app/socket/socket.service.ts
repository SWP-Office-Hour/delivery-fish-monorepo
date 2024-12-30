import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  @WebSocketServer() server: Socket;

  private clients: Map<string, Socket> = new Map();
  private staffs: Map<string, Socket> = new Map();

  handleConnectionForClient(client: Socket): any {
    client.join(client.id);
    this.clients.set(client.id, client);
    client.emit('message', {
      message: 'Hello from server',
    });
    // this.staff?.emit('message-from-server', {
    //   clients: Array.from(this.clients.keys()),
    // });
    this.staffs.forEach((staff) => {
      staff.emit('message-from-server', {
        amount: this.clients.size,
        clients: Array.from(this.clients.keys()),
      });
    });
  }

  handleConnectionForStaff(client: Socket): any {
    this.staffs.set(client.id, client);
    this.staffs.forEach((staff) => {
      staff.emit('message-from-server', {
        amount: this.clients.size,
        clients: Array.from(this.clients.keys()),
      });
    });
  }

  handleDisconnect(client: Socket): any {
    if (this.clients.has(client.id)) {
      this.clients.delete(client.id);
      this.staffs.forEach((staff) => {
        staff.emit('message-from-server', {
          amount: this.clients.size,
          clients: Array.from(this.clients.keys()),
        });
      });
    } else if (this.staffs.has(client.id)) {
      this.staffs.delete(client.id);
    }
  }

  handleMessageFromClient(client: Socket, payload: any) {
    this.staffs.forEach((staff) => {
      staff.emit('message', {
        message: payload.message,
        from: client.id,
      });
    });
  }

  handleMessageFromStaff(
    client: Socket,
    payload: { message: string; to: string }
  ) {
    this.clients.get(payload.to)?.emit('message', {
      message: payload.message,
      from: client.id,
    });
  }
}
