import React, { FC } from 'react';
import { WhpptImageData } from '../Model/ImageData';
import { WhpptGalleryTag } from '../../../Gallery/Components';
import { getLandscapeRatio, getPortraitRatio } from './Cropper';
import { AspectRatioObject } from '../../../Gallery/Model';

type ApectRatioPickerProps = {
  value: WhpptImageData;
  onChange: (value: WhpptImageData) => void;
  device: string;
  setStencilProps: (number: number) => void;
  aspectRatios: AspectRatioObject[];
};

export const AspectRatioPicker: FC<ApectRatioPickerProps> = ({ value, onChange, device, setStencilProps, aspectRatios }) => {
  return (
    <div className="whppt-gallery-settings__tag-container">
      {aspectRatios.map((ratio, index) => {
        const disabled = value[device] && ratio.label !== value[device].aspectRatio.label && value[device].aspectRatio.label !== 'freeform';

        return (
          <button
            key={index}
            disabled={disabled}
            onClick={() => {
              value[device].aspectRatio = ratio;
              setStencilProps(
                value[device].orientation === 'landscape'
                  ? getLandscapeRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio)
                  : getPortraitRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio)
              );
              if (ratio.label === 'square') onChange({ ...value, orientation: undefined });
            }}>
            <WhpptGalleryTag tag={ratio.label} disabled={disabled} />
          </button>
        );
      })}

      <div className="whppt-gallery-settings__tag-container">
        <button
          onClick={() => {
            onChange({ ...value, [device]: { ...value[device], orientation: 'landscape' } });
            setStencilProps(getLandscapeRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio));
          }}>
          <WhpptGalleryTag tag={'landscape'} />
        </button>

        <button
          onClick={() => {
            onChange({ ...value, [device]: { ...value[device], orientation: 'portrait' } });
            setStencilProps(getPortraitRatio(value[device]?.aspectRatio.ratio || aspectRatios[0].ratio));
          }}>
          <WhpptGalleryTag tag={'portrait'} />
        </button>
      </div>
    </div>
  );
};
