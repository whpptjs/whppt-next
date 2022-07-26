import React, { FC, useState, useEffect } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { ImageData, AspectRatioObject } from '../../Gallery/Model';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { WhpptGalleryTag, WhpptInput } from '../../ui/components';

export type ImageEditorOptions = EditorOptions & { cropping: string[]; aspectLock?: string };

const aspectRatios: AspectRatioObject[] = [
  { label: '16/9', ratio: { w: 16, h: 9 } },
  { label: '9/5', ratio: { w: 9, h: 5 } },
  { label: '4/3', ratio: { w: 4, h: 3 } },
  { label: 'square', ratio: { w: 1, h: 1 } },
  { label: 'freeform', ratio: { w: undefined, h: undefined } },
];

export const WhpptImageEditor: FC<EditorArgs<ImageData, ImageEditorOptions>> = ({ value, onChange }) => {
  const { showGallery, hideEditor, page } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [imageToCrop, setImageToCrop] = useState<ImageData>(null);

  const [alt, setAlt] = useState<string>(value.defaultAlt || '');
  const [caption, setCaption] = useState<string>(value.defaultCaption || '');

  const [device, setDevice] = useState<string>('desktop');

  const [aspectRatio, setAspectRatio] = useState<AspectRatioObject>(aspectRatios[0]);
  const [stencilProps, setStencilProps] = useState(aspectRatio.ratio.w / aspectRatio.ratio.h);
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  const getLandscapeRatio = () => {
    const { w, h } = aspectRatio.ratio;
    return w >= h ? w / h : h / w;
  };

  const getPortraitRatio = () => {
    const { w, h } = aspectRatio.ratio;
    return w >= h ? h / w : w / h;
  };

  type Orientation = 'landscape' | 'portrait';

  useEffect(() => {
    setImageToCrop(value);
  }, [value]);

  useEffect(() => {
    setStencilProps(orientation === 'landscape' ? getLandscapeRatio() : getPortraitRatio());
  }, [orientation, aspectRatio]);

  const getImgUrl = galleryItemId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${galleryItemId}`;
  };

  const onCrop = (cropper: CropperRef) => {
    setCoords(cropper.getCoordinates());
    const { label, ratio } = aspectRatio;

    const deviceCrop = {
      aspectRatio: { label, ratio: { w: ratio.w, h: ratio.h } },
      orientation,
      coords,
    };

    let crops = [];

    if (!page.crops) {
      crops.push({ galleryItemId: imageToCrop._id, [device]: deviceCrop });
      onChange({ ...value, crops });
      console.log('page', page);

      return;
    }

    if (page.crops) {
      const imageCrops = page.crops.find(crop => crop.galleryItemId === imageToCrop._id);
      if (imageCrops) {
        imageCrops[device] = deviceCrop;
        crops = page.crops.map(crop => {
          if (crop.galleryItemId === imageToCrop._id) {
            return imageCrops;
          } else {
            return crop;
          }
        });
      } else {
        crops.push({ galleryItemId: imageToCrop._id, [device]: deviceCrop });
      }
    }

    onChange({ ...value, crops });
    console.log('value', value);
    console.log('page', page);
  };

  return (
    <div className="whppt-image-editor">
      <section
        className="whppt-form-section whppt-form-section--bottom-gap"
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '3rem', color: 'white' }}>
          <p
            className={`whppt-image-editor__device-select${device === 'desktop' ? '--active' : ''}`}
            onClick={() => {
              setDevice('desktop');
            }}>
            Desktop
          </p>
          <p
            className={`whppt-image-editor__device-select${device === 'tablet' ? '--active' : ''}`}
            onClick={() => {
              setDevice('tablet');
            }}>
            Tablet
          </p>
          <p
            className={`whppt-image-editor__device-select${device === 'mobile' ? '--active' : ''}`}
            onClick={() => {
              setDevice('mobile');
            }}>
            Mobile
          </p>
        </div>

        <Cropper
          src={imageToCrop ? `${getImgUrl(imageToCrop._id)}` : ''}
          style={{ height: 200, width: 360, objectFit: 'cover' }}
          onChange={imageToCrop && onCrop}
          backgroundClassName={'whppt-cropper-background'}
          stencilProps={{ aspectRatio: stencilProps, lines: true }}
        />

        <div className="whppt-image-editor__gallery-actions">
          <p
            className="whppt-image-editor__gallery-actions__button"
            onClick={() => {
              showGallery({ limitType: 'image', use: fileDetails => onChange(fileDetails) });
              hideEditor();
            }}>
            {imageToCrop ? 'Change picture' : 'Pick from Gallery'}
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

            <p>This image is locked to a {} ratio</p>
          </div>
        )}

        <div>
          <WhpptInput value={alt} onChange={setAlt} id={'alt'} label={'Alt text'} info={''} error={''} type={'text'} name="altText" />
          <WhpptInput
            value={caption}
            onChange={setCaption}
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
