import React, { useEffect, useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { useWhppt } from '../Context';

export const WhpptImageEditor = () => {
  const { imageEditor, toggleGallery } = useWhppt();
  // const [croppedImg, setCroppedImg] = useState('');
  const [coords, setCoords] = useState<any>(null);
  const [imageToCrop, setImageToCrop] = useState(null);

  useEffect(() => {
    setImageToCrop(imageEditor.imageToCrop);
  }, [imageEditor.imageToCrop]);

  // const [image, setImage] = useState<CropperImage | null>(null);
  // const [state, setState] = useState<CropperState | null>(null);

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
    <section
      className="whppt-form-section whppt-form-section--bottom-gap"
      style={{ display: 'flex', flexDirection: 'column', position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
      <Cropper
        src={imageToCrop ? `${getImgUrl(imageToCrop._id)}?o=true` : ''}
        style={{ height: 200, width: 360, objectFit: 'cover' }}
        onChange={onCrop}
        backgroundClassName={'whppt-cropper-background'}
        stencilProps={{ aspectRatio: 9 / 5 }}
      />
      <p style={{ color: 'white', cursor: 'pointer' }} onClick={() => toggleGallery()}>
        {imageToCrop ? 'Change picture' : 'Pick from Gallery'}
      </p>
    </section>
  );
};
