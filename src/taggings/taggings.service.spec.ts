import { Test, TestingModule } from '@nestjs/testing';
import { TaggingsService } from './taggings.service';

describe('TaggingsService', () => {
  let service: TaggingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaggingsService],
    }).compile();

    service = module.get<TaggingsService>(TaggingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
