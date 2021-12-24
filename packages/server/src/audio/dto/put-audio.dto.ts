import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { VolumeBalance } from './volume-balance.dto';

export class PutAudio {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  volume: number;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => new VolumeBalance(value))
  balance: VolumeBalance;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  mute: boolean;
}
