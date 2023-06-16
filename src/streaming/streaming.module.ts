import { Module } from '@nestjs/common';
import { StreamingGateway } from './streaming.gateway';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [MessagesModule],
  providers: [StreamingGateway]
})
export class StreamingModule {}
