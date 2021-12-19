import { DeviceType } from 'native-sound-mixer';
import { AudioType } from 'src/audio/interfaces/audio-type.interface';

export const serializeDeviceType = (type: DeviceType): AudioType => {
  switch (type) {
    case DeviceType.CAPTURE:
      return AudioType.INPUT;
    case DeviceType.RENDER:
      return AudioType.OUTPUT;
    default:
      throw new Error(`Invalid device type: ${type}`);
  }
};

export const parseDeviceType = (type: AudioType): DeviceType => {
  switch (type) {
    case AudioType.INPUT:
      return DeviceType.CAPTURE;
    case AudioType.OUTPUT:
      return DeviceType.RENDER;
    default:
      throw new Error(`Invalid audio type: ${type}`);
  }
};
