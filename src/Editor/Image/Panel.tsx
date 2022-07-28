import React, { FC, useState, useEffect, useMemo } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { ImageDataSize, AspectRatioObject, PageImageData } from '../../Gallery/Model';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { WhpptGalleryTag, WhpptInput } from '../../ui/components';
import { Gallery } from '../../Gallery';
import { nanoid } from 'nanoid';
import { aspectRatios } from './AspectRatios';
import { getLandscapeRatio, getPortraitRatio } from './helpers';
import { DevicePicker } from './DevicePicker';

type Orientation = 'landscape' | 'portrait';

export const WhpptImageEditor: FC<EditorArgs<PageImageData, EditorOptions>> = ({ value, onChange }) => {
  const { toggleSettingsPanel, hideEditor } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [device, setDevice] = useState<string>('desktop');

  const imageIdToCrop = useMemo(() => {
    console.log('value', value);
    return (value[device] as ImageDataSize) && value[device].galleryItemId;
  }, [device, value]);

  const [aspectRatio, setAspectRatio] = useState<AspectRatioObject>(aspectRatios[0]);
  const [stencilProps, setStencilProps] = useState(aspectRatio.ratio.w / aspectRatio.ratio.h);
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  useEffect(() => {
    setDevice(Object.keys(value)[0]);
  }, [value]);

  useEffect(() => {
    setStencilProps(orientation === 'landscape' ? getLandscapeRatio(aspectRatio.ratio) : getPortraitRatio(aspectRatio.ratio));
  }, [orientation, aspectRatio]);

  const getImgUrl = galleryItemId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;
  };

  const onCrop = (cropper: CropperRef) => {
    setCoords(cropper.getCoordinates());
    const { label, ratio } = aspectRatio;

    const deviceCrop = {
      aspectRatio: { label, ratio: { w: ratio.w, h: ratio.h } },
      galleryItemId: nanoid(),
      orientation,
      coords,
    };

    onChange({ ...value, [device]: deviceCrop });
  };

  return (
    <div className="whppt-image-editor">
      <section
        className="whppt-form-section whppt-form-section--bottom-gap"
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DevicePicker devices={Object.keys(value)} set={setDevice} />

        <Cropper
          src={imageIdToCrop ? `${getImgUrl(imageIdToCrop)}` : ''}
          style={{ height: 200, width: 360, objectFit: 'cover' }}
          onChange={imageIdToCrop && onCrop}
          backgroundClassName={'whppt-cropper-background'}
          stencilProps={{ aspectRatio: stencilProps, lines: true }}
        />

        <div className="whppt-image-editor__gallery-actions">
          <p
            className="whppt-image-editor__gallery-actions__button"
            onClick={() => {
              toggleSettingsPanel({
                key: 'gallery',
                activeTab: 'images',
                component: <Gallery />,
              });
              hideEditor();
            }}>
            {imageIdToCrop ? 'Change picture' : 'Pick from Gallery'}
          </p>

          <p className="whppt-image-editor__gallery-actions__button" onClick={() => setImageToCrop(null)}>
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
            value={value.crops[device].altText}
            onChange={alt =>
              onChange({
                ...value,
                [device]: {
                  ...value.crops[device],
                  altText: alt,
                },
              })
            }
            id={'altText'}
            label={'Alt text'}
            info={''}
            error={''}
            type={'text'}
            name="altText"
          />
          <WhpptInput
            value={value.crops[device].caption}
            onChange={caption =>
              onChange({
                ...value,
                [device]: {
                  ...value.crops[device],
                  altText: caption,
                },
              })
            }
            id={'caption'}
            label={'Caption'}
            info={''}
            error={''}
            type={'text'}
            name="caption"
          />
        </div>
      </section>
    </div>
  );
};
