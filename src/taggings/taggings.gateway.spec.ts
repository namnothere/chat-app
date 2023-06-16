import { Test, TestingModule } from '@nestjs/testing';
import { TaggingsGateway } from './taggings.gateway';
import { TaggingsService } from './taggings.service';

describe('TaggingsGateway', () => {
  let gateway: TaggingsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaggingsGateway, TaggingsService],
    }).compile();

    gateway = module.get<TaggingsGateway>(TaggingsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
