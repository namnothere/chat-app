import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true
  },
})
export class StreamingGateway {

  @WebSocketServer()
  server: Server
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('joinStream')
  async joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join('stream');
  }

  handleDisconnect(client: any) {
    client.disconnect(true);
    console.log('a user disconnected Id: ' + client.id);
    this.messagesService.disconnect(client.id);
  }
}
