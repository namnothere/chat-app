import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingController } from './streaming/streaming.controller';
import { StreamingService } from './streaming/streaming.service';
import { StreamingModule } from './streaming/streaming.module';
import { TaggingsModule } from './taggings/taggings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tiny.db.elephantsql.com',
      username: 'gyodqdjd',
      password: 'EQJzKu9SlQ1C0E0m2NxsEWCWZ4gcN2vl',
      database: 'gyodqdjd',
      autoLoadEntities: true,
      synchronize: true,
      
    }),
    MessagesModule,
    StreamingModule,
    TaggingsModule
  ],
  controllers: [AppController, StreamingController],
  providers: [AppService, StreamingService],
})
export class AppModule {}
