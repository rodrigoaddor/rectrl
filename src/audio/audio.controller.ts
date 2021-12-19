import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { AudioService } from './audio.service';
import { Device } from './dto/device.dto';
import { GetDefault } from './dto/get-default.dto';
import { PutAudio } from './dto/put-audio.dto';
import { AudioSession } from './dto/session.dto';

@Controller('audio')
export class AudioController {
  constructor(private readonly service: AudioService) {}

  @Get('devices')
  getDevices(): Device[] {
    return this.service.listDevices();
  }

  @Get('default')
  getDefault(@Query() { type }: GetDefault): Device {
    return this.service.getDefaultDevice(type);
  }

  @Get(':device')
  getDevice(@Param('device') device: number): Device {
    return this.service.listDevices()[device];
  }

  @Get(':device/:session')
  getSession(
    @Param('device') device: number,
    @Param('session') session: number,
  ): AudioSession {
    return this.service.listDevices()[device].sessions[session];
  }

  @Put(':device')
  putDevice(@Param('device') deviceIndex: number, @Body() options: PutAudio) {
    const device = this.service.listDevices()[deviceIndex];
    Object.assign(device, options);
  }

  @Put(':device/:session')
  putSession(
    @Param('device') deviceIndex: number,
    @Param('session') sessionIndex: number,
    @Body() options: PutAudio,
  ) {
    const device = this.service.listDevices()[deviceIndex];
    const session = device.sessions[sessionIndex];
    Object.assign(session, options);
  }
}
