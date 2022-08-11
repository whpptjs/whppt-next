import React, { FC } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { WhpptImageCrop } from '../..';

export const getLandscapeRatio = ratio => {
  const { w, h } = ratio;
  return w >= h ? w / h : h / w;
};

export const getPortraitRatio = ratio => {
  const { w, h } = ratio;
  return w >= h ? h / w : w / h;
};

export const defaultCoordinates = {
  height: 150,
  width: 250,
  top: 20,
  left: 10,
};

type WhpptCropperProps = {
  value: WhpptImageCrop;
  onChange: (data: WhpptImageCrop) => void;
  stencilProps: number;
};

export const WhpptCropper: FC<WhpptCropperProps> = ({ value, onChange, stencilProps }) => {
  const getImgUrl = galleryItemId => `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;

  const onCrop = (cropper: CropperRef) => {
    const coords = cropper.getCoordinates();
    const { label, ratio } = value.aspectRatio;

    const imageCrop: WhpptImageCrop = {
      aspectRatio: { label, ratio: { w: ratio.w, h: ratio.h } },
      coords: coords || value.coords,
      galleryItemId: value.galleryItemId,
      orientation: value.orientation,
    };

    onChange(imageCrop);
  };

  return (
    <Cropper
      src={getImgUrl(value.galleryItemId)}
      className="whppt-image-editor-panel__cropper"
      onChange={onCrop}
      backgroundClassName={'whppt-cropper-background'}
      stencilProps={{ aspectRatio: stencilProps, lines: true }}
      defaultCoordinates={value.coords ? value.coords : defaultCoordinates}
    />
  );
};
