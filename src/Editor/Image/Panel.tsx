import React, { FC, useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { EditorArgs } from '../EditorArgs';
import { useWhppt } from '../../Context';
import { WhpptInput } from '../../ui/components';
import { WhpptGalleryTag } from '../../Gallery/Components';
import { Gallery } from '../../Gallery';
import { aspectRatios } from '../../Gallery/Model';
import { DevicePicker } from './DevicePicker';
import { WhpptImageCrop, WhpptImageData } from './ImageData';
import { GalleryItem } from '../../Gallery/Model';
import { ImageEditorOptions } from '../../Editor/';

const getLandscapeRatio = ratio => {
  const { w, h } = ratio;
  return w >= h ? w / h : h / w;
};

const getPortraitRatio = ratio => {
  const { w, h } = ratio;
  return w >= h ? h / w : w / h;
};

export const WhpptImageEditorPanel: FC<EditorArgs<WhpptImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  const { toggleSettingsPanel } = useWhppt();

  const [device, setDevice] = useState<string>('desktop');
  const [stencilProps, setStencilProps] = useState(() => {
    if (!value[device]) return getLandscapeRatio(aspectRatios[0].ratio);

    return value[device].orientation === 'landscape'
      ? getLandscapeRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio)
      : getPortraitRatio(value[device]?.aspectRatio.ratio || aspectRatios[0].ratio);
  });

  const getImgUrl = galleryItemId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;
  };

  const useImage = (image: GalleryItem) => {
    const defaultCrop: WhpptImageCrop = {
      galleryItemId: image._id,
      aspectRatio: { ...aspectRatios[0] },
      orientation: 'landscape',
      coords: { width: 100, height: 100, left: 0, top: 0 },
    };
    onChange({ ...value, [device]: { ...defaultCrop, galleryItemId: image._id } });
  };

  const onCrop = (cropper: CropperRef) => {
    const coords = cropper.getCoordinates();
    const { label, ratio } = value[device].aspectRatio;

    const imageCrop: WhpptImageCrop = {
      aspectRatio: { label, ratio: { w: ratio.w, h: ratio.h } },
      coords: coords || value[device].coords,
      galleryItemId: value[device].galleryItemId,
      orientation: value[device].orientation,
    };

    onChange({ ...value, [device]: { ...value[device], ...imageCrop } });
  };

  return (
    <div className="whppt-image-editor-panel">
      <DevicePicker devices={options?.sizes || []} set={setDevice} activeDevice={device} />

      {value[device] ? (
        <>
          {value[device].galleryItemId ? (
            <Cropper
              src={getImgUrl(value[device].galleryItemId)}
              className="whppt-image-editor-panel__cropper"
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
                    value[device].aspectRatio = ratio;
                    setStencilProps(
                      value[device].orientation === 'landscape'
                        ? getLandscapeRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio)
                        : getPortraitRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio)
                    );
                    if (ratio.label === 'square') onChange({ ...value, orientation: undefined });
                  }}>
                  <WhpptGalleryTag tag={ratio.label} />
                </button>
              ))}

              <div className="whppt-gallery__settings__tag-container">
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
          )}

          <p>
            {value[device].aspectRatio.label === 'freeform'
              ? 'No aspect ratio locked'
              : `This image is locked to a ${
                  value[device].aspectRatio.label === 'square'
                    ? 'square'
                    : `${value[device].aspectRatio.ratio.w.toString()} / ${value[device].aspectRatio.ratio.h.toString()}`
                } ratio`}
          </p>
        </>
      ) : (
        <div
          className="whppt-image-editor-panel__cropper--empty"
          onClick={() => {
            toggleSettingsPanel({
              key: 'gallery',
              activeTab: 'image',
              component: <Gallery onUse={useImage} />,
            });
          }}>
          <button className="whppt-image-editor-panel__gallery-actions__button">{'Pick from Gallery'}</button>
        </div>
      )}

      {value[device] && (
        <>
          <div className="whppt-image-editor-panel__gallery-actions">
            <button
              className="whppt-image-editor-panel__gallery-actions__button"
              onClick={() => {
                toggleSettingsPanel({
                  key: 'gallery',
                  activeTab: 'image',
                  component: <Gallery onUse={useImage} />,
                });
              }}>
              {'Change picture'}
            </button>
            <button className="whppt-image-editor-panel__gallery-actions__button" onClick={() => onChange({ ...value, [device]: null })}>
              Remove
            </button>
          </div>

          <div>
            <WhpptInput
              value={(value[device] && value[device].altText) || ''}
              onChange={text => {
                onChange({ ...value, [device]: { ...value[device], altText: text } });
              }}
              id={'altText'}
              label={'Alt text'}
              info={''}
              error={''}
              type={'text'}
              name="altText"
            />
            <WhpptInput
              value={(value[device] && value[device].caption) || ''}
              onChange={text => {
                onChange({ ...value, [device]: { ...value[device], caption: text } });
              }}
              id={'caption'}
              label={'Caption'}
              info={''}
              error={''}
              type={'text'}
              name="caption"
            />
          </div>
        </>
      )}
    </div>
  );
};
