import React, { FC, useState, useMemo } from 'react';
import { EditorArgs } from '../EditorArgs';
import { useWhppt } from '../../Context';
import { WhpptInput } from '../../ui/components';
import { Gallery } from '../../Gallery';
import { CropPicker } from './Components/CropPicker';
import { WhpptImageCrop, WhpptImageData } from './Model/ImageData';
import { GalleryItem } from '../../Gallery/Model';
import { ImageEditorOptions } from '../../Editor/';
import { WhpptCropper } from './Components/Cropper';
import { AspectRatioPicker } from './Components/AspectRatioPicker';
import { aspectRatios } from './Model';

export const WhpptImageEditorPanel: FC<EditorArgs<WhpptImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  const { toggleSettingsPanel } = useWhppt();

  const [device, setDevice] = useState(options.sizes[0]);
  const fixedCrop = useMemo(() => options.sizes.find(s => s.name === device.name), [options.sizes, device]);
  const fixedCropAspectRatio = useMemo(
    () => fixedCrop && fixedCrop.aspectRatio && { label: 'locked', ratio: fixedCrop.aspectRatio },
    [fixedCrop]
  );
  const fixedCropOrientation = useMemo(() => fixedCrop && fixedCrop.orientation, [fixedCrop]);

  const useImage = (image: GalleryItem) => {
    const deviceImage = value && value[device.name];
    const { _id, defaultAltText, defaultCaption } = image;

    const imageOrientation = () => {
      return fixedCrop.orientation || (deviceImage && deviceImage.orientation) || 'landscape';
    };

    const defaultCrop: WhpptImageCrop = {
      galleryItemId: _id,
      aspectRatio: fixedCrop.aspectRatio ? fixedCropAspectRatio : (deviceImage && deviceImage.aspectRatio) || { ...aspectRatios.at(-1) },
      orientation: imageOrientation(),
      altText: defaultAltText || '',
      caption: defaultCaption || '',
    };

    onChange({ ...value, [device.name]: { ...defaultCrop, galleryItemId: _id } });
  };

  return (
    <div className="whppt-image-editor-panel">
      <CropPicker devices={options?.sizes || []} set={setDevice} activeDevice={device} />

      {value[device?.name] ? (
        <>
          {value[device.name].galleryItemId ? (
            <>
              <WhpptCropper
                value={value[device.name]}
                onChange={updatedImageData => {
                  onChange({ ...value, [device.name]: { ...value[device.name], ...updatedImageData } });
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
                  onClick={() => onChange({ ...value, [device.name]: null })}>
                  Remove
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          <AspectRatioPicker
            onChange={updatedValue => onChange({ ...value, [device.name]: { ...value[device.name], ...updatedValue } })}
            selectedDevice={value && value[device.name]}
            aspectRatios={aspectRatios}
            disableAspectRatios={!!fixedCropAspectRatio}
            disableOrientation={!!fixedCropOrientation}
          />
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

      {value[device.name] && (
        <div>
          <WhpptInput
            value={(value[device.name] && value[device.name].altText) || ''}
            onChange={text => {
              onChange({ ...value, [device.name]: { ...value[device.name], altText: text } });
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
            value={(value[device.name] && value[device.name].caption) || ''}
            onChange={text => {
              onChange({ ...value, [device.name]: { ...value[device.name], caption: text } });
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
