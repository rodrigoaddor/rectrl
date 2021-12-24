import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AudioService } from './audio.service';
import { Device } from './dto/device.dto';
import { GetDefault } from './dto/get-default.dto';
import { PutAudio } from './dto/put-audio.dto';
import { AudioSession } from './dto/session.dto';

@ApiTags('audio')
@Controller('audio')
export class AudioController {
  constructor(private readonly service: AudioService) {}

  @Get('devices')
  @ApiOkResponse({ description: 'Returns a list of audio devices' })
  getDevices(): Device[] {
    return this.service.listDevices();
  }

  @ApiOkResponse({ description: 'Returns the default input or output device' })
  @Get('default')
  getDefault(@Query() { type }: GetDefault): Device {
    return this.service.getDefaultDevice(type);
  }

  @ApiOkResponse({ description: 'Returns a device data' })
  @ApiNotFoundResponse({ description: "The device doesn't exist" })
  @Get(':device')
  getDevice(
    @Res() res: Response,
    @Param('device') deviceIndex: number,
  ): Device {
    const device = this.service.listDevices()[deviceIndex];

    if (device) {
      return device;
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Device not found');
    }
  }

  @ApiOkResponse({ description: 'Returns a session data' })
  @ApiNotFoundResponse({ description: "The device or session doesn't exist" })
  @Get(':device/:session')
  getSession(
    @Res() res: Response,
    @Param('device') deviceIndex: number,
    @Param('session') sessionIndex: number,
  ): AudioSession {
    const device = this.service.listDevices()[deviceIndex];
    if (!device) {
      res.status(HttpStatus.NOT_FOUND).send('Device not found');
      return;
    }

    const session = device.sessions[sessionIndex];
    if (!session) {
      res.status(HttpStatus.NOT_FOUND).send('Session not found');
      return;
    }

    return session;
  }

  @ApiOkResponse({ description: "Updates a device's data" })
  @ApiNotFoundResponse({ description: "The device doesn't exist" })
  @Put(':device')
  putDevice(
    @Res() res: Response,
    @Param('device') deviceIndex: number,
    @Body() options: PutAudio,
  ) {
    const device = this.service.listDevices()[deviceIndex];

    if (!device) {
      res.status(HttpStatus.NOT_FOUND).send('Device not found');
      return;
    }

    Object.assign(device, options);
    return device;
  }

  @ApiOkResponse({ description: "Updates a session's data" })
  @ApiNotFoundResponse({ description: "The device or session doesn't exist" })
  @Put(':device/:session')
  putSession(
    @Res() res: Response,
    @Param('device') deviceIndex: number,
    @Param('session') sessionIndex: number,
    @Body() options: PutAudio,
  ) {
    const device = this.service.listDevices()[deviceIndex];
    if (!device) {
      res.status(HttpStatus.NOT_FOUND).send('Device not found');
      return;
    }

    const session = device.sessions[sessionIndex];
    if (!session) {
      res.status(HttpStatus.NOT_FOUND).send('Session not found');
      return;
    }

    Object.assign(session, options);
    return session;
  }
}
