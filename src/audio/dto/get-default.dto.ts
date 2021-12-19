import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { AudioType } from '../interfaces/audio-type.interface';

export class GetDefault {
  @ApiProperty()
  @IsIn(Object.values(AudioType))
  type: AudioType;
}
