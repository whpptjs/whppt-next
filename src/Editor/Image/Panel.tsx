import React, { FC, useState, useEffect } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { ImageData, AspectRatio, AspectRatioObject } from '../../Gallery/Model';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';
import { WhpptGalleryTag, WhpptInput } from '../../ui/components';

export type ImageEditorOptions = EditorOptions & { cropping: string[]; aspectLock?: string };

export const WhpptImageEditor: FC<EditorArgs<ImageData, ImageEditorOptions>> = ({ value, onChange }) => {
  const { showGallery, hideEditor } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [imageToCrop, setImageToCrop] = useState<ImageData>(null);

  const [alt, setAlt] = useState<string>(value.defaultAlt || '');
  const [caption, setCaption] = useState<string>(value.defaultCaption || '');

  const [device, setDevice] = useState<string>('desktop');

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>({ w: 9, h: 5 });

  const getLandscapeRatio = () => {
    const { w, h } = aspectRatio;
    return w >= h ? aspectRatio : { w: h, h: w };
  };

  const getPortraitRatio = () => {
    const { w, h } = aspectRatio;
    return h >= w ? aspectRatio : { w: h, h: w };
  };

  const aspectRatios: AspectRatioObject[] = [
    { label: '16/9', ratio: { w: 16, h: 9 } },
    { label: '9/5', ratio: { w: 9, h: 5 } },
    { label: '4/3', ratio: { w: 4, h: 3 } },
    { label: 'square', ratio: { w: 1, h: 1 } },
    { label: 'freeform', ratio: { w: undefined, h: undefined } },
    { label: 'Landscape', ratio: getLandscapeRatio() },
    { label: 'Portrait', ratio: getPortraitRatio() },
  ];

  useEffect(() => {
    setImageToCrop(value);
  }, [value]);

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/img/${imgId}`;
  };

  const onCrop = (cropper: CropperRef) => {
    setCoords(cropper.getCoordinates());

    if (coords) {
      // setImage(cropper.getImage());
      // setState(cropper.getState());
      // setCroppedImg(
      //   `${cropper.getImage().src.replace('o=true', '')}cw=${coords.width}&ch=${coords.height}&cx=${coords.left}&cy=${coords.top}`
      // );
    }
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
              setAspectRatio({ w: 16, h: 9 });
            }}>
            Desktop
          </p>
          <p
            className={`whppt-image-editor__device-select${device === 'tablet' ? '--active' : ''}`}
            onClick={() => {
              setDevice('tablet');
              setAspectRatio({ w: 3, h: 4 });
            }}>
            Tablet
          </p>
          <p
            className={`whppt-image-editor__device-select${device === 'mobile' ? '--active' : ''}`}
            onClick={() => {
              setDevice('mobile');
              setAspectRatio({ w: 9, h: 16 });
            }}>
            Mobile
          </p>
        </div>

        <Cropper
          src={imageToCrop ? `${getImgUrl(imageToCrop._id)}?o=true` : ''}
          style={{ height: 200, width: 360, objectFit: 'cover' }}
          onChange={onCrop}
          backgroundClassName={'whppt-cropper-background'}
          stencilProps={{ aspectRatio: aspectRatio.w / aspectRatio.h, lines: true }}
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
              <button key={index} onClick={() => setAspectRatio(ratio.ratio)}>
                <WhpptGalleryTag tag={ratio.label} />
              </button>
            ))}
            <p>This image is locked to a {} ratio</p>
          </div>
        )}

        <div>
          <WhpptInput
            value={alt}
            onChange={setAlt}
            id={'alt'}
            label={'Alt text'}
            info={''}
            error={''}
            type={'text'}
            name="defaultAltText"
          />
          <WhpptInput
            value={caption}
            onChange={setCaption}
            id={'caption'}
            label={'Caption'}
            info={''}
            error={''}
            type={'text'}
            name="defaultCaption"
          />
        </div>
      </section>
    </div>
  );
};
