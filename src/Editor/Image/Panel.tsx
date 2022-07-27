import React, { FC, useState, useEffect } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { ImageData, AspectRatioObject } from '../../Gallery/Model';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { WhpptGalleryTag, WhpptInput } from '../../ui/components';
import { Gallery } from '../../Gallery';
import { nanoid } from 'nanoid';
import { aspectRatios } from './AspectRatios';
import { getLandscapeRatio, getPortraitRatio } from './helpers';

export type ImageEditorOptions = EditorOptions & { cropping: string[]; aspectLock?: string };

const content = { type: 'Carousel', slides: [] };
type Orientation = 'landscape' | 'portrait';

export const WhpptImageEditor: FC<EditorArgs<ImageData, ImageEditorOptions>> = ({ value, onChange }) => {
  const { toggleSettingsPanel, hideEditor } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [imageToCrop, setImageToCrop] = useState<ImageData>({ _id: 'vlrl61ozmll ' }); //passed down from UI
  //prop content: {type, slides/etc}
  const [crops, setCrops] = useState({});

  const [altText, setAltText] = useState<string>((value && value.defaultAlt) || '');
  const [caption, setCaption] = useState<string>((value && value.defaultCaption) || '');

  const [device, setDevice] = useState<string>('desktop');

  const [aspectRatio, setAspectRatio] = useState<AspectRatioObject>(aspectRatios[0]);
  const [stencilProps, setStencilProps] = useState(aspectRatio.ratio.w / aspectRatio.ratio.h);
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  useEffect(() => {
    // TODO: from props, remove??
    setImageToCrop({ _id: 'vlrl61ozmll' });
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

    setCrops({ ...crops, [device]: deviceCrop });
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
              toggleSettingsPanel({
                key: 'gallery',
                activeTab: 'images',
                component: <Gallery />,
              });
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
            value={altText}
            onChange={text => {
              setAltText(text);
              setCrops({ ...crops, [device]: { ...crops[device], altText: text } });
            }}
            id={'altText'}
            label={'Alt text'}
            info={''}
            error={''}
            type={'text'}
            name="altText"
          />
          <WhpptInput
            value={caption}
            onChange={text => {
              setCaption(text);
              setCrops({ ...crops, [device]: { ...crops[device], caption: text } });
            }}
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
