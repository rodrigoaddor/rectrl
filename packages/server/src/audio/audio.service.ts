import { Injectable } from '@nestjs/common';
import SoundMixer from 'native-sound-mixer';
import { parseDeviceType } from 'src/utils/sound';
import { Device } from './dto/device.dto';
import { AudioType } from './interfaces/audio-type.interface';

@Injectable()
export class AudioService {
  listDevices(): Device[] {
    return SoundMixer.devices.map((device) => new Device(device));
  }

  getDefaultDevice(type: AudioType): Device {
    const nativeType = parseDeviceType(type);

    const device = SoundMixer.getDefaultDevice(nativeType);

    return new Device(device);
  }
}
