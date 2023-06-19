import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { TaggingsService } from './taggings.service';
import { CreateTaggingDto } from './dto/create-tagging.dto';
import { UpdateTaggingDto } from './dto/update-tagging.dto';

@WebSocketGateway()
export class TaggingsGateway {
  constructor(private readonly taggingsService: TaggingsService) {}

  @SubscribeMessage('createTagging')
  create(@MessageBody() createTaggingDto: CreateTaggingDto) {
    return this.taggingsService.create(createTaggingDto);
  }

  @SubscribeMessage('findAllTaggings')
  findAll(
    @MessageBody('stream_id') stream_id: string,
  ) {
    return this.taggingsService.findAll(stream_id);
  }

  @SubscribeMessage('updateTagging')
  update(@MessageBody() updateTaggingDto: UpdateTaggingDto) {
    return this.taggingsService.update(updateTaggingDto.id, updateTaggingDto);
  }

  @SubscribeMessage('removeTagging')
  remove(@MessageBody() id: number) {
    return this.taggingsService.remove(id);
  }

  @SubscribeMessage('findLatestTaggings')
  findLatest(
    @MessageBody('stream_id') stream_id: string,
    @MessageBody('limit') limit: number = 20,
  ) {
    return this.taggingsService.findLatest(stream_id, limit);
  }

  @SubscribeMessage('searchTagging')
  async searchMessage(
    @MessageBody('query') query: string,
    @MessageBody('limit') limit: number = 7,
    @MessageBody('stream_id') stream_id: string
  ) {
    return await this.taggingsService.searchTagging(query, limit, stream_id);
  }

}
