import React, { FC, useState, useMemo } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { WhpptGalleryTag, WhpptInput } from '../../ui/components';
import { Gallery } from '../../Gallery';
import { aspectRatios } from './AspectRatios';
import { getLandscapeRatio, getPortraitRatio } from './helpers';
import { DevicePicker } from './DevicePicker';
import { ImageDataSize, PageImageData, ImageData } from './../../Gallery/Model/Image';

type Orientation = 'landscape' | 'portrait';

export type ImageEditorOptions = EditorOptions & { sizes?: string[] };

export const WhpptImageEditor: FC<EditorArgs<PageImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  const { toggleSettingsPanel } = useWhppt();

  const [device, setDevice] = useState<string>('desktop');
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  const selectedDevice = useMemo(() => value && value[device], [device, value]);

  const [stencilProps, setStencilProps] = useState(
    orientation === 'landscape'
      ? getLandscapeRatio(selectedDevice?.aspectRatio?.ratio || aspectRatios[0].ratio)
      : getPortraitRatio(selectedDevice?.aspectRatio.ratio || aspectRatios[0].ratio)
  );

  const getImgUrl = galleryItemId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;
  };

  const useImage = (image: ImageData) => {
    const defaultSize: ImageDataSize = {
      galleryItemId: image._id,
      aspectRatio: { ...aspectRatios[0] },
      orientation: 'landscape',
      coords: { width: 100, height: 100, left: 0, top: 0 },
    };
    onChange({ ...value, [device]: { ...defaultSize, galleryItemId: image._id } });
  };

  const onCrop = (cropper: CropperRef) => {
    const coords = cropper.getCoordinates();
    const { label, ratio } = selectedDevice.aspectRatio;

    const deviceCrop: ImageDataSize = {
      aspectRatio: { label, ratio: { w: ratio.w, h: ratio.h } },
      orientation,
      coords: coords || selectedDevice.coords,
      galleryItemId: selectedDevice.galleryItemId,
    };

    onChange({ ...value, [device]: { ...selectedDevice, ...deviceCrop } });
  };

  return (
    <div className="whppt-image-editor">
      <DevicePicker devices={options?.sizes || []} set={setDevice} activeDevice={device} />

      {selectedDevice ? (
        <>
          {selectedDevice.galleryItemId ? (
            <Cropper
              src={getImgUrl(selectedDevice.galleryItemId)}
              className="whppt-image-editor__cropper"
              onChange={onCrop}
              backgroundClassName={'whppt-cropper-background'}
              stencilProps={{ aspectRatio: stencilProps, lines: true }}
            />
          ) : (
            <></>
          )}

          {aspectRatios && (
            <div className="whppt-gallery__settings__tag-container">
              {aspectRatios.map((ratio, index) => (
                <button
                  key={index}
                  onClick={() => {
                    selectedDevice.aspectRatio = ratio;
                    setStencilProps(
                      orientation === 'landscape'
                        ? getLandscapeRatio(selectedDevice?.aspectRatio?.ratio || aspectRatios[0].ratio)
                        : getPortraitRatio(selectedDevice?.aspectRatio.ratio || aspectRatios[0].ratio)
                    );
                    if (ratio.label === 'square') setOrientation(undefined);
                  }}>
                  <WhpptGalleryTag tag={ratio.label} />
                </button>
              ))}

              <div className="whppt-gallery__settings__tag-container">
                <button
                  onClick={() => {
                    setOrientation('landscape');
                    setStencilProps(getLandscapeRatio(selectedDevice?.aspectRatio?.ratio || aspectRatios[0].ratio));
                  }}>
                  <WhpptGalleryTag tag={'landscape'} />
                </button>

                <button
                  onClick={() => {
                    setOrientation('portrait');
                    setStencilProps(getPortraitRatio(selectedDevice?.aspectRatio.ratio || aspectRatios[0].ratio));
                  }}>
                  <WhpptGalleryTag tag={'portrait'} />
                </button>
              </div>
            </div>
          )}

          <p>
            {selectedDevice.aspectRatio.label === 'freeform'
              ? 'No aspect ratio locked'
              : `This image is locked to a ${
                  selectedDevice.aspectRatio.label === 'square'
                    ? 'square'
                    : `${selectedDevice.aspectRatio.ratio.w.toString()} / ${selectedDevice.aspectRatio.ratio.h.toString()}`
                } ratio`}
          </p>
        </>
      ) : (
        <div
          className="whppt-image-editor__cropper-empty"
          onClick={() => {
            toggleSettingsPanel({
              key: 'gallery',
              activeTab: 'image',
              component: <Gallery onUse={useImage} />,
            });
          }}>
          <p className="whppt-image-editor__gallery-actions__button">{'Pick from Gallery'}</p>
        </div>
      )}

      {selectedDevice && (
        <div className="whppt-image-editor__gallery-actions">
          <p
            className="whppt-image-editor__gallery-actions__button"
            onClick={() => {
              toggleSettingsPanel({
                key: 'gallery',
                activeTab: 'image',
                component: <Gallery onUse={useImage} />,
              });
            }}>
            {'Change picture'}
          </p>
          <p className="whppt-image-editor__gallery-actions__button" onClick={() => onChange(null)}>
            Remove
          </p>
        </div>
      )}

      <div>
        <WhpptInput
          value={(selectedDevice && selectedDevice.altText) || ''}
          onChange={text => {
            onChange({ ...value, [device]: { ...selectedDevice, altText: text } });
          }}
          id={'altText'}
          label={'Alt text'}
          info={''}
          error={''}
          type={'text'}
          name="altText"
        />
        <WhpptInput
          value={(selectedDevice && selectedDevice.caption) || ''}
          onChange={text => {
            onChange({ ...value, [device]: { ...selectedDevice, caption: text } });
          }}
          id={'caption'}
          label={'Caption'}
          info={''}
          error={''}
          type={'text'}
          name="caption"
        />
      </div>
    </div>
  );
};
