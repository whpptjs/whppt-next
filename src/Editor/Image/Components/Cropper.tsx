import React, { FC, useMemo } from 'react';
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

  const stencilAspectRatio = useMemo(() => {
    const orientation = value.orientation;
    const aspectRatio = value.aspectRatio;
    return orientation === 'landscape' ? getLandscapeRatio(aspectRatio?.ratio) : getPortraitRatio(aspectRatio?.ratio);
  }, [value]);

  const onCrop = (cropper: CropperRef) => {
    const coords = cropper.getCoordinates();
    onChange({ ...value, coords: coords || value.coords });
  };

  return (
    <Cropper
      src={getImgUrl(value.galleryItemId)}
      className="whppt-image-editor-panel__cropper"
      onChange={onCrop}
      backgroundClassName={'whppt-cropper-background'}
      stencilProps={{ aspectRatio: stencilAspectRatio, lines: true }}
      defaultCoordinates={value?.coords || null}
    />
  );
};
