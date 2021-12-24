import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioGateway } from './audio.gateway';
import { AudioService } from './audio.service';

@Module({
  controllers: [AudioController],
  providers: [AudioService, AudioGateway],
})
export class AudioModule {}
