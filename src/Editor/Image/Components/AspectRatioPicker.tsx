import React, { FC, useMemo } from 'react';
import { WhpptImageCrop } from '../Model/ImageData';
import { WhpptGalleryTag } from '../../../Gallery/Components';
// import { getLandscapeRatio, getPortraitRatio } from './Cropper';
import { CropAspectRatio } from '../Model';

type ApectRatioPickerProps = {
  selectedDevice: WhpptImageCrop;
  onChange: (value: WhpptImageCrop) => void;
  // setStencilProps: (number: number) => void;
  aspectRatios: CropAspectRatio[];
  disableAspectRatios: boolean;
  disableOrientation: boolean;
};

export const AspectRatioPicker: FC<ApectRatioPickerProps> = ({
  selectedDevice,
  onChange,
  aspectRatios,
  disableAspectRatios,
  disableOrientation,
}) => {
  const formattedAspectRatio = useMemo(
    () => `${selectedDevice.aspectRatio.ratio.w}/${selectedDevice.aspectRatio.ratio.h}`,
    [selectedDevice.aspectRatio]
  );
  return (
    <div className="whppt-gallery-settings__tag-container">
      {disableAspectRatios ? (
        <span>{`Image aspect ratio locked to "${formattedAspectRatio}"`}</span>
      ) : (
        <>
          {aspectRatios.map((ratio, index) => {
            return (
              <button
                key={index}
                disabled={disableAspectRatios}
                onClick={() => {
                  onChange({ ...selectedDevice, aspectRatio: ratio });
                }}>
                <WhpptGalleryTag active={selectedDevice.aspectRatio.label === ratio.label} tag={ratio.label} />
              </button>
            );
          })}
        </>
      )}

      <div className="whppt-gallery-settings__tag-container">
        {disableOrientation ? (
          <span>{`Image orientation locked to "${selectedDevice.orientation}"`}</span>
        ) : (
          <>
            <button disabled={disableOrientation} onClick={() => onChange({ ...selectedDevice, orientation: 'landscape' })}>
              <WhpptGalleryTag tag={'landscape'} active={selectedDevice.orientation === 'landscape'} />
            </button>

            <button disabled={disableOrientation} onClick={() => onChange({ ...selectedDevice, orientation: 'portrait' })}>
              <WhpptGalleryTag tag={'portrait'} active={selectedDevice.orientation === 'portrait'} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
