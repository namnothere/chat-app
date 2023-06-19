import { CreateTaggingDto } from './dto/create-tagging.dto';
import { UpdateTaggingDto } from './dto/update-tagging.dto';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Tagging } from './entities/tagging.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaggingsService {
  
  constructor(
    @InjectRepository(Tagging)
    private taggingRepository: Repository<Tagging>
  ) {}

  async create(createTaggingDto: CreateTaggingDto) {
    let newTagging = await this.taggingRepository.save(createTaggingDto);
    return newTagging;
  }
  
  async findAll(stream_id: string) {
    let allMsg = await this.taggingRepository.find({
      where: {
        stream_id: stream_id
      }
    });
    return allMsg;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  async update(id: number, updateTaggingDto: UpdateTaggingDto) {
    await this.taggingRepository.update(id, updateTaggingDto);
  }

  async remove(id: number) {
    await this.taggingRepository.delete(id);
  }

  async findLatest(stream_id: string, limit: number) {
    const res = await this.taggingRepository.find({
      where: {
        stream_id: stream_id
      },
      order: {
        created_at: 'DESC'
      },
      take: limit
    });
    return res.reverse();
  }
  
  async searchTagging(query: string, limit: number, stream_id: string) {
    return await this.taggingRepository.find({
      where: {
        content: Like(`%${query}%`),
        stream_id: stream_id
      },
      order: {
        created_at: 'DESC'
      },
      take: limit
    });
  }
}
