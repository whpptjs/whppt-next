import React, { FC } from 'react';

type DevicePickerProps = {
  devices: string[];
  activeDevice: string;
  set: (device: string) => void;
};

export const DevicePicker: FC<DevicePickerProps> = ({ devices, set, activeDevice }) => {
  return (
    <div className="whppt-image-editor__device-picker">
      {devices.map((device, index) => (
        <p
          key={index}
          className={`whppt-image-editor__device-select${device === activeDevice ? '--active' : ''}`}
          onClick={() => {
            set(device.toLocaleLowerCase());
          }}>
          {device.charAt(0).toUpperCase() + device.slice(1)}
        </p>
      ))}
    </div>
  );
};
