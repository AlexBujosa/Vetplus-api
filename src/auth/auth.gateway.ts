import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Cache } from 'cache-manager';

@WebSocketGateway()
export class AuthGateWay implements OnGatewayInit {
  @WebSocketServer() server: Server;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  afterInit(server: Server) {
    console.log('Initialized');
  }

  emitTimeRemaining(room: string, timeRemaining: number) {
    let timeSpent = 0;
    const intervalId = setInterval(() => {
      timeSpent += 1000;
      this.server.emit(room, {
        timeLeft: `${(timeRemaining - timeSpent) / 1000} sec`,
      });
      if (timeSpent > timeRemaining - 1) clearInterval(intervalId);
    }, 1000);
  }

  @SubscribeMessage('authRoom')
  handleAuthRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveAuthRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.leave(room);
  }
}
