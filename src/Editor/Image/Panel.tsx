import React, { FC, useState, useEffect, useCallback } from 'react';
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
import { WhpptCropper, getLandscapeRatio, getPortraitRatio, defaultCoordinates } from './Cropper';

export const WhpptImageEditorPanel: FC<EditorArgs<WhpptImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  const { toggleSettingsPanel } = useWhppt();

  const [device, setDevice] = useState<string>('desktop');

  const getStencilProps = useCallback(() => {
    if (!value[device]) return getLandscapeRatio(aspectRatios[0].ratio);

    return value[device].orientation === 'landscape'
      ? getLandscapeRatio(value[device]?.aspectRatio?.ratio || aspectRatios[0].ratio)
      : getPortraitRatio(value[device]?.aspectRatio.ratio || aspectRatios[0].ratio);
  }, [value, device]);

  const [stencilProps, setStencilProps] = useState(() => getStencilProps());

  useEffect(() => setStencilProps(getStencilProps()), [device, getStencilProps]);

  const useImage = (image: GalleryItem) => {
    const deviceImage = value && value[device];
    const { _id, defaultAltText, defaultCaption } = image;

    const imageOrientation = () => {
      if (deviceImage && deviceImage.aspectRatio.label === 'square') return undefined;

      return (deviceImage && deviceImage.orientation) || 'landscape';
    };

    const defaultCrop: WhpptImageCrop = {
      galleryItemId: _id,
      aspectRatio: (deviceImage && deviceImage.aspectRatio) || { ...aspectRatios[0] },
      orientation: imageOrientation(),
      coords: (deviceImage && deviceImage.coords) || defaultCoordinates,
      altText: defaultAltText || '',
      caption: defaultCaption || '',
    };

    onChange({ ...value, [device]: { ...defaultCrop, galleryItemId: _id } });
  };

  return (
    <div className="whppt-image-editor-panel">
      <DevicePicker devices={options?.sizes || []} set={setDevice} activeDevice={device} />

      {value[device] ? (
        <>
          {value[device].galleryItemId ? (
            <>
              <WhpptCropper
                value={value[device]}
                stencilProps={stencilProps}
                onChange={updatedImageData => {
                  onChange({ ...value, [device]: { ...value[device], ...updatedImageData } });
                }}
              />
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
                  {'Choose a different image'}
                </button>
                <button
                  className="whppt-image-editor-panel__gallery-actions__button"
                  onClick={() => onChange({ ...value, [device]: null })}>
                  Remove
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          {aspectRatios && (
            <div className="whppt-gallery-settings__tag-container">
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

              <div className="whppt-gallery-settings__tag-container">
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
        <div>
          <WhpptInput
            value={(value[device] && value[device].altText) || ''}
            onChange={text => {
              onChange({ ...value, [device]: { ...value[device], altText: text } });
            }}
            id={'altText'}
            label={'Alt text'}
            info="Enter alt text for this image"
            error={''}
            type={'text'}
            name="altText"
            placeholder="Alt text"
          />
          <WhpptInput
            value={(value[device] && value[device].caption) || ''}
            onChange={text => {
              onChange({ ...value, [device]: { ...value[device], caption: text } });
            }}
            id={'caption'}
            label={'Caption'}
            info="Enter caption for this image"
            error={''}
            type={'text'}
            name="caption"
            placeholder="Caption"
          />
        </div>
      )}
    </div>
  );
};
