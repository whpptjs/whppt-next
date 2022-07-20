import React, { FC, useState, useEffect } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { ImageData } from '../../Gallery/Model';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../EditorOptions';
import { useWhppt } from '../../Context';

export type ImageEditorOptions = EditorOptions & { cropping: string[]; aspectLock?: string };

export const WhpptImageEditor: FC<EditorArgs<ImageData, ImageEditorOptions>> = ({ value, onChange, options }) => {
  const { showGallery, hideEditor } = useWhppt();

  const [coords, setCoords] = useState<any>(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(9 / 5);

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

  console.log('IMGAE ON IMAGE EDITOR', value);

  return (
    <div className="whppt-image-editor">
      <section className="whppt-form-section whppt-form-section--bottom-gap" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', color: 'white' }}>
          <p style={{ cursor: 'pointer' }} onClick={() => setAspectRatio(9 / 5)}>
            Desktop
          </p>
          <p style={{ cursor: 'pointer' }} onClick={() => setAspectRatio(4 / 3)}>
            Tablet
          </p>
          <p style={{ cursor: 'pointer' }} onClick={() => setAspectRatio(16 / 9)}>
            Mobile
          </p>
        </div>

        <Cropper
          src={imageToCrop ? `${getImgUrl(imageToCrop._id)}?o=true` : ''}
          style={{ height: 200, width: 360, objectFit: 'cover' }}
          onChange={onCrop}
          backgroundClassName={'whppt-cropper-background'}
          stencilProps={{ aspectRatio }}
        />
        <p
          style={{ color: 'white', cursor: 'pointer' }}
          onClick={() => {
            showGallery({ limitType: 'image', use: fileDetails => onChange(fileDetails) });
            hideEditor();
          }}>
          {imageToCrop ? 'Change picture' : 'Pick from Gallery'}
        </p>
      </section>
    </div>
  );
};
