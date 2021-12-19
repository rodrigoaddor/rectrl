import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';

@Module({
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}
