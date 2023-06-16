import { Module } from '@nestjs/common';
import { TaggingsService } from './taggings.service';
import { TaggingsGateway } from './taggings.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tagging } from './entities/tagging.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tagging
    ]),
  ],
  providers: [TaggingsGateway, TaggingsService],
  exports: [TaggingsService],
})
export class TaggingsModule {}
