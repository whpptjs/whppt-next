import React, { FC } from 'react';
import { CropConfig } from '../Model';

type CropPickerProps = {
  devices: CropConfig[];
  activeDevice: CropConfig;
  set: (device: CropConfig) => void;
};

export const CropPicker: FC<CropPickerProps> = ({ devices, set, activeDevice }) => {
  return (
    <div className="whppt-image-editor-panel__device-picker">
      {devices.map((device, index) => (
        <p
          key={index}
          className={`whppt-image-editor-panel__device-select${device === activeDevice ? '--active' : ''}`}
          onClick={() => {
            set(device);
          }}>
          {device.name.charAt(0).toUpperCase() + device.name.slice(1)}
        </p>
      ))}
    </div>
  );
};
