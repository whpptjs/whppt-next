import React, { FC } from 'react';
import { WhpptImageCrop } from '../Model/ImageData';
import { WhpptGalleryTag } from '../../../Gallery/Components';
import { getLandscapeRatio, getPortraitRatio } from './Cropper';
import { AspectRatioObject } from '../../../Gallery/Model';

type ApectRatioPickerProps = {
  selectedDevice: WhpptImageCrop;
  onChange: (value: WhpptImageCrop) => void;
  setStencilProps: (number: number) => void;
  aspectRatios: AspectRatioObject[];
};

export const AspectRatioPicker: FC<ApectRatioPickerProps> = ({ selectedDevice, onChange, setStencilProps, aspectRatios }) => {
  const orientationDisabled = selectedDevice.aspectRatio?.label === 'square';

  return (
    <div className="whppt-gallery-settings__tag-container">
      {aspectRatios.map((ratio, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              selectedDevice.aspectRatio = ratio;
              setStencilProps(
                selectedDevice.orientation === 'landscape'
                  ? getLandscapeRatio(selectedDevice.aspectRatio?.ratio || aspectRatios[0].ratio)
                  : getPortraitRatio(selectedDevice.aspectRatio?.ratio || aspectRatios[0].ratio)
              );
              if (ratio.label === 'square') onChange({ ...selectedDevice, orientation: undefined });
            }}>
            <WhpptGalleryTag tag={ratio.label} />
          </button>
        );
      })}

      <div className="whppt-gallery-settings__tag-container">
        <button
          disabled={orientationDisabled}
          className={orientationDisabled ? 'whppt-gallery-settings__tag--disabled' : ''}
          onClick={() => {
            onChange({ ...selectedDevice, orientation: 'landscape' });
            setStencilProps(getLandscapeRatio({ w: selectedDevice.coords.width, h: selectedDevice.coords.height }));
          }}>
          <WhpptGalleryTag tag={'landscape'} />
        </button>

        <button
          disabled={orientationDisabled}
          className={orientationDisabled ? 'whppt-gallery-settings__tag--disabled' : ''}
          onClick={() => {
            onChange({ ...selectedDevice, orientation: 'portrait' });
            setStencilProps(getPortraitRatio({ w: selectedDevice.coords.width, h: selectedDevice.coords.height }));
          }}>
          <WhpptGalleryTag tag={'portrait'} />
        </button>
      </div>
    </div>
  );
};
