import React, { FC, useMemo, useRef, useState } from 'react';
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
  const [ready, setReady] = useState(false);

  const cropperRef = useRef<CropperRef>();

  const stencilAspectRaio = useMemo(() => {
    const orientation = value.orientation;
    const aspectRatio = value.aspectRatio;
    return orientation === 'landscape' ? getLandscapeRatio(aspectRatio?.ratio) : getPortraitRatio(aspectRatio?.ratio);
  }, [value]);

  const imageSize = useMemo(() => {
    return ready && cropperRef?.current?.getState()?.imageSize;
  }, [cropperRef, ready]);

  const valueCoords = useMemo(() => {
    if (!imageSize) return undefined;

    return (
      value.coords || {
        height: imageSize.height * (isNaN(stencilAspectRaio) ? 1 : stencilAspectRaio),
        width: imageSize.width,
        top: 0,
        left: 0,
      }
    );
  }, [stencilAspectRaio, value, imageSize]);

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
      onReady={() => setReady(true)}
      onChange={onCrop}
      backgroundClassName={'whppt-cropper-background'}
      stencilProps={{ aspectRatio: stencilAspectRaio, lines: true }}
      defaultCoordinates={valueCoords}
    />
  );
};
