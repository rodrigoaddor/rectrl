import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { VolumeBalance as NativeVolumeBalance } from 'native-sound-mixer';

export class VolumeBalance {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  right: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  left: number;

  @IsOptional()
  @IsBoolean()
  stereo: boolean;

  constructor(balance: NativeVolumeBalance) {
    Object.assign(this, balance);
  }
}
