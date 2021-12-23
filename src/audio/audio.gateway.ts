import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { Socket } from 'socket.io';
import { WsBadRequestFilter } from 'src/utils/ws-bad-request/ws-bad-request.filter';
import { AudioService } from './audio.service';
import { VolumeSubscriber } from './dto/volume-subscriber.dto';
import { AudioType } from './interfaces/audio-type.interface';

@UsePipes(ValidationPipe)
@UseFilters(WsBadRequestFilter)
@WebSocketGateway()
export class AudioGateway implements OnGatewayInit, OnGatewayDisconnect {
  constructor(private readonly service: AudioService) {}

  private readonly subject = new Subject<number>();
  private readonly listeners = new Map<string, () => void>();

  afterInit() {
    const outputDevice = this.service.getDefaultDevice(AudioType.OUTPUT);
    let previousVolume = outputDevice.volume;

    setInterval(() => {
      if (outputDevice.volume !== previousVolume) {
        previousVolume = outputDevice.volume;
        this.subject.next(previousVolume);
      }
    }, 100);
  }

  handleDisconnect(socket: Socket) {
    this.listeners.delete(socket.id);
  }

  @SubscribeMessage('volume')
  handleThingMessage(
    @MessageBody() { action, device, session }: VolumeSubscriber,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(action);
    return { event: 'volume', data: 'hello' };
  }

  @SubscribeMessage('event')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): string {
    if (data === 'subscribe') {
      const subscription = this.subject.subscribe((volume) => {
        socket.emit('volume', volume);
      });

      this.listeners.set(socket.id, subscription.unsubscribe);
      return 'Subscribed';
    } else if (data === 'unsubscribe') {
      this.listeners.get(socket.id)();
      this.listeners.delete(socket.id);
      return 'Unsubscribed';
    }
  }
}
