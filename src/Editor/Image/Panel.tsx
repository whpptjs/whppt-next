import React, { FC, useState, useEffect } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { AspectRatioObject } from '../../Gallery/Model';
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

export type ImageEditorOptions = EditorOptions & { device?: string };

export const WhpptImageEditor: FC<EditorArgs<PageImageData & ImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  const { toggleSettingsPanel, hideEditor } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [device, setDevice] = useState<string>((options && options.device) || 'desktop');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioObject>(aspectRatios[0]);
  const [stencilProps, setStencilProps] = useState(aspectRatio.ratio.w / aspectRatio.ratio.h);
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  useEffect(() => {
    setStencilProps(orientation === 'landscape' ? getLandscapeRatio(aspectRatio.ratio) : getPortraitRatio(aspectRatio.ratio));
  }, [orientation, aspectRatio]);

  const getImgUrl = galleryItemId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;
  };

  const onCrop = (cropper: CropperRef) => {
    setCoords(cropper.getCoordinates());
    const { label, ratio } = aspectRatio;

    const deviceCrop: ImageDataSize = {
      aspectRatio: { label, ratio: { w: ratio.w, h: ratio.h } },
      orientation,
      coords,
      galleryItemId: value[device].galleryItemId || value._id,
    };

    onChange({ ...value, [device]: { ...value[device], ...deviceCrop } });
  };

  return (
    <div className="whppt-image-editor">
      <DevicePicker devices={['Desktop', 'Tablet', 'Mobile']} set={setDevice} activeDevice={device} />

      {value && (value.galleryItemId || value._id) ? (
        <Cropper
          src={getImgUrl(value.galleryItemId || value._id)}
          className="whppt-image-editor__cropper"
          onChange={onCrop}
          backgroundClassName={'whppt-cropper-background'}
          stencilProps={{ aspectRatio: stencilProps, lines: true }}
        />
      ) : (
        <div className="whppt-image-editor__cropper-empty">
          <p>No picture selected</p>
        </div>
      )}

      <div className="whppt-image-editor__gallery-actions">
        <p
          className="whppt-image-editor__gallery-actions__button"
          onClick={() => {
            toggleSettingsPanel({
              key: 'gallery',
              activeTab: 'image',
              component: <Gallery device={device} />,
            });
            hideEditor();
          }}>
          {value && (value.galleryItemId || value._id) ? 'Change picture' : 'Pick from Gallery'}
        </p>

        <p className="whppt-image-editor__gallery-actions__button" onClick={() => onChange(null)}>
          Remove
        </p>
      </div>

      {aspectRatios && (
        <div className="whppt-gallery__settings__tag-container">
          {aspectRatios.map((ratio, index) => (
            <button
              key={index}
              onClick={() => {
                setAspectRatio(ratio);
                if (ratio.label === 'square') setOrientation(undefined);
              }}>
              <WhpptGalleryTag tag={ratio.label} />
            </button>
          ))}

          <div className="whppt-gallery__settings__tag-container">
            <button onClick={() => setOrientation('landscape')}>
              <WhpptGalleryTag tag={'landscape'} />
            </button>

            <button onClick={() => setOrientation('portrait')}>
              <WhpptGalleryTag tag={'portrait'} />
            </button>
          </div>
        </div>
      )}

      <p>
        {aspectRatio.label === 'freeform'
          ? 'No aspect ratio locked'
          : `This image is locked to a ${
              aspectRatio.label === 'square' ? 'square' : `${aspectRatio.ratio.w.toString()} / ${aspectRatio.ratio.h.toString()}`
            } ratio`}
      </p>

      <div>
        <WhpptInput
          value={(value && value[device] && value[device].altText) || ''}
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
          value={(value && value[device] && value[device].caption) || ''}
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
    </div>
  );
};
