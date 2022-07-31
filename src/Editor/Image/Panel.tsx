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
import { PageData } from '../../Page/Model/Page';

type Orientation = 'landscape' | 'portrait';

export const WhpptImageEditor: FC<EditorArgs<PageData, EditorOptions & { device?: string; contentType: string; selected: ImageData }>> = ({
  value,
  onChange,
  options,
}) => {
  const { toggleSettingsPanel, hideEditor, page, setPage } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [device, setDevice] = useState<string>((options && options.device) || 'desktop');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioObject>(aspectRatios[0]);
  const [stencilProps, setStencilProps] = useState(aspectRatio.ratio.w / aspectRatio.ratio.h);
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [contentUpdate, setContentUpdate] = useState(page.contents.find(content => content.contentType == options.contentType));

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
      orientation,
      coords,
      galleryItemId: options.selected._id,
    };

    setContentUpdate({ ...contentUpdate, [device]: deviceCrop });
    const contents = (page.contents.length && updateContents()) || [{ contentType: options.contentType, ...contentUpdate }];

    setPage({ ...page, contents: contents });
    console.log('page', page);
  };

  const updateContents = () => {
    console.log('is Updating content');
    return page.contents.map(content => {
      if (content.contentType === options.contentType) {
        //look for type coming from UI event
        content = contentUpdate;
        return content;
      }
      return content;
    });
  };

  return (
    <div className="whppt-image-editor">
      <section
        className="whppt-form-section whppt-form-section--bottom-gap"
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DevicePicker devices={['desktop', 'tablet', 'mobile']} set={setDevice} activeDevice={device} />

        <Cropper
          src={value ? `${getImgUrl(options.selected._id)}` : ''}
          style={{ height: 200, width: 360, objectFit: 'cover' }}
          onChange={onCrop}
          backgroundClassName={'whppt-cropper-background'}
          stencilProps={{ aspectRatio: stencilProps, lines: true }}
        />

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
            {value._id ? 'Change picture' : 'Pick from Gallery'}
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
            value={(contentUpdate && contentUpdate[device] && contentUpdate[device].altText) || ''}
            onChange={text => {
              setContentUpdate({ ...contentUpdate, [device]: { ...contentUpdate[device], altText: text } });
            }}
            id={'altText'}
            label={'Alt text'}
            info={''}
            error={''}
            type={'text'}
            name="altText"
          />
          <WhpptInput
            value={(contentUpdate && contentUpdate[device] && contentUpdate[device].caption) || ''}
            onChange={text => {
              setContentUpdate({ ...contentUpdate, [device]: { ...contentUpdate[device], caption: text } });
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
