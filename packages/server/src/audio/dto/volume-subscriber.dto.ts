import { IsIn, IsNumber } from 'class-validator';

export enum VolumeSubscribeAction {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

export class VolumeSubscriber {
  @IsIn(Object.values(VolumeSubscribeAction))
  action: VolumeSubscribeAction;

  @IsNumber()
  device: number;
  session?: number;
}
