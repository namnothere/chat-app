import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Like, Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>
  ) {}

  clientToUser = {};
  async create(createMessageDto: CreateMessageDto) {
    let newMSG = await this.messageRepository.save(createMessageDto);
    return newMSG;
  }
  
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    console.log(this.clientToUser);
    return Object.values(this.clientToUser);
  }

  getClientName(id: string) {
    return this.clientToUser[id];
  }

  async findAll(room: string = 'main') {
    let allMsg = await this.messageRepository.find({
      where: {
        to: room || null
      }
    });
    return allMsg;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.messageRepository.update(id, updateMessageDto);
  }

  async remove(id: number) {
    // return `This action removes a #${id} message`;
    await this.messageRepository.delete(id);
  }

  findLatest(room: string, limit: number = 10) {
    return this.messageRepository.find({
      where: {
        to: room
      },
      order: {
        created_at: 'DESC'
      },
      take: limit
    }).then(res => res.reverse());
  }
  
  async searchMessage(query: string, limit: number = 7) {
    return await this.messageRepository.find({
      where: {
        content: Like(`%${query}%`)
      },
      order: {
        created_at: 'DESC'
      },
      take: limit
    });
  }

  disconnect(clientId: string) {
    delete this.clientToUser[clientId];
  }
}
