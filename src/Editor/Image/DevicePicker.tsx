import React, { FC } from 'react';

type DevicePickerProps = {
  devices: string[];
  activeDevice: string;
  set: (device: string) => void;
};

export const DevicePicker: FC<DevicePickerProps> = ({ devices, set, activeDevice }) => {
  return (
    <div style={{ display: 'flex', gap: '3rem', color: 'white' }}>
      {devices.map((device, index) => (
        <p
          key={index}
          className={`whppt-image-editor__device-select${device === activeDevice ? '--active' : ''}`}
          onClick={() => {
            console.log('setting');
            set(device);
          }}>
          {device}
        </p>
      ))}
    </div>
  );
};
