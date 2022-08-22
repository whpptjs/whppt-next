import React, { FC, useMemo, useCallback, useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { WhpptImageCrop } from '../Model/ImageData';

type WhpptCropperProps = {
  value: WhpptImageCrop;
  onChange: (data: WhpptImageCrop) => void;
};

export const getLandscapeRatio = ratio => {
  const { w, h } = ratio;
  return w >= h ? w / h : h / w;
};

export const getPortraitRatio = ratio => {
  const { w, h } = ratio;
  return w >= h ? h / w : w / h;
};

export const WhpptCropper: FC<WhpptCropperProps> = ({ value, onChange }) => {
  const getImgUrl = galleryItemId => `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;
  const [imageSize, setImageSize] = useState(null);

  const stencilAspectRatio = useMemo(() => {
    const orientation = value.orientation;
    const aspectRatio = value.aspectRatio;
    return orientation === 'landscape' ? getLandscapeRatio(aspectRatio?.ratio) : getPortraitRatio(aspectRatio?.ratio);
  }, [value]);

  const cropperRef = useCallback(
    cropper => {
      if (!imageSize) {
        const image = cropper?.getImage();

        image &&
          setImageSize({
            height: image.height * (isNaN(stencilAspectRatio) ? 1 : stencilAspectRatio),
            width: image.width,
            top: 0,
            left: 0,
          });
      }
    },
    [imageSize, stencilAspectRatio]
  );

  const valueCoords = useMemo(() => {
    return (
      value.coords ||
      (imageSize && {
        height: imageSize.height * (isNaN(stencilAspectRatio) ? 1 : stencilAspectRatio),
        width: imageSize.width,
        top: 0,
        left: 0,
      })
    );
  }, [stencilAspectRatio, value, imageSize]);

  const onCrop = (cropper: CropperRef) => {
    const coords = cropper.getCoordinates();

    if (!valueCoords) return;

    onChange({ ...value, coords: coords || value.coords });
  };

  return (
    <Cropper
      ref={cropperRef}
      src={getImgUrl(value.galleryItemId)}
      className="whppt-image-editor-panel__cropper"
      onChange={onCrop}
      backgroundClassName={'whppt-cropper-background'}
      stencilProps={{ aspectRatio: stencilAspectRatio, lines: true }}
      defaultCoordinates={valueCoords}
    />
  );
};
