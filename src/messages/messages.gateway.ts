import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io'
import { OnModuleInit } from '@nestjs/common';

// @WebSocketGateway({ cors: '*:*' })
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true
  },
})
export class MessagesGateway implements OnModuleInit, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server
  constructor(private readonly messagesService: MessagesService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('a user connected Id: ' + socket.id);
    })
  }

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    await this.messagesService.create(createMessageDto);
    // let msg = await this.messagesService.create(createMessageDto);
    // client.broadcast.emit('newMessage', msg);
    // return msg;
    // return ;
    // client.emit('newMessage', msg);
    // this.server.emit('newMessage', await this.findLatest());
    this.server.in(createMessageDto.to).emit('newMessage', await this.findLatest(createMessageDto.to));
  }

  @SubscribeMessage('findAllMessages')
  async findAll(
    @MessageBody() to: string
  ) {
    return this.messagesService.findAll(to);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    await this.messagesService.update(updateMessageDto.id, updateMessageDto);
    // this.server.emit('newMessage', await this.findLatest());
    this.server.to(updateMessageDto.to).emit('newMessage', await this.findLatest(updateMessageDto.to));
  }

  @SubscribeMessage('removeMessage')
  async remove(
    @MessageBody() messageInfo: { id: number, to: string },
    @ConnectedSocket() client: Socket
  ) {
    await this.messagesService.remove(messageInfo.id);
    // this.server.emit('newMessage', await this.findLatest());
    // this.server.in(client.rooms[0]).emit('newMessage', await this.findLatest());
    client.to(client.rooms[0]).emit('newMessage', await this.findLatest(messageInfo.to));
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody() userInfo: { name: string, to: string },
    @ConnectedSocket() client: Socket
  ) {
    // let identify = this.messagesService.identify(userInfo.name, client.id);
    client.join(userInfo.to);
    let clients =  await this.server.in(userInfo.to).fetchSockets();
    this.server.to(userInfo.to).emit('newUser_join', clients.length);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody() userIsTyping: { isTyping: boolean, to: string },
    @ConnectedSocket() client: Socket
  ) {
      const name = await this.messagesService.getClientName(client.id);
      client.broadcast.to(userIsTyping.to).emit('typing', { name, isTyping: userIsTyping });
  }

  @SubscribeMessage('findLatest')
  async findLatest(
    @MessageBody('room') room: string
  ) {
    return await this.messagesService.findLatest(room);
  }

  @SubscribeMessage('search')
  async searchMessage(
    @MessageBody('query') query: string,
  ) {
    return await this.messagesService.searchMessage(query);
  }

  handleDisconnect(client: any) {
    client.disconnect(true);
    console.log('a user disconnected Id: ' + client.id);
    this.messagesService.disconnect(client.id);
  }

}
