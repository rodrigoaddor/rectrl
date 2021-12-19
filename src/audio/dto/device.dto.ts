import { AudioType } from '../interfaces/audio-type.interface';
import { AudioSession } from './session.dto';
import { VolumeBalance } from './volume-balance.dto';
import { Device as NativeDevice } from 'native-sound-mixer';
import { serializeDeviceType } from 'src/utils/sound';
import { Exclude, Expose } from 'class-transformer';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class Device {
  @Exclude()
  @ApiHideProperty()
  private readonly device: NativeDevice;

  @ApiProperty({ readOnly: true })
  readonly name: string;

  @ApiProperty({ readOnly: true })
  readonly type: AudioType;

  @ApiProperty({ readOnly: true })
  readonly sessions: AudioSession[];

  @Expose()
  @ApiPropertyOptional()
  public get volume(): number {
    return this.device.volume;
  }
  public set volume(value: number) {
    this.device.volume = value;
  }

  @Expose()
  @ApiPropertyOptional()
  public get mute(): boolean {
    return this.device.mute;
  }
  public set mute(value: boolean) {
    this.device.mute = value;
  }

  @Expose()
  @ApiPropertyOptional()
  public get balance(): VolumeBalance {
    return new VolumeBalance(this.device.balance);
  }
  public set balance(value: VolumeBalance) {
    this.device.balance = value;
  }

  constructor(device: NativeDevice) {
    this.device = device;
    this.name = this.device.name;
    this.type = serializeDeviceType(this.device.type);
    this.sessions = this.device.sessions.map(
      (session) => new AudioSession(session),
    );
  }
}
