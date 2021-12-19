import { VolumeBalance } from './volume-balance.dto';
import { AudioSession as NativeAudioSession } from 'native-sound-mixer';
import { Exclude, Expose } from 'class-transformer';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class AudioSession {
  @Exclude()
  @ApiHideProperty()
  private session: NativeAudioSession;

  @ApiProperty({ readOnly: true })
  readonly name: string;

  @ApiProperty({ readOnly: true })
  readonly appName: string;

  @Expose()
  @ApiPropertyOptional()
  public get volume(): number {
    return this.session.volume;
  }
  public set volume(value: number) {
    this.session.volume = value;
  }

  @Expose()
  @ApiPropertyOptional()
  public get mute(): boolean {
    return this.session.mute;
  }
  public set mute(value: boolean) {
    this.session.mute = value;
  }

  @Expose()
  @ApiPropertyOptional()
  public get balance(): VolumeBalance {
    return new VolumeBalance(this.session.balance);
  }
  public set balance(value: VolumeBalance) {
    this.session.balance = value;
  }

  constructor(session: NativeAudioSession) {
    this.session = session;
    this.name = this.session.name;
    this.appName = this.session.appName;
  }
}
