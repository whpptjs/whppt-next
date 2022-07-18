import React, { FC, useEffect, useState, useRef } from 'react';
import { WhpptButton, WhpptTab } from '../ui/components';
import { useWhppt } from '../Context';
import { Image } from './Model/Image';
import { CropperRef, Cropper, CropperPreview, CropperImage, CropperState } from 'react-advanced-cropper';

export const Images: FC<WhpptTab> = () => {
  const { api } = useWhppt();
  const [images, setImages] = useState<Image[]>([]);
  const [imageData, setImageData] = useState(null);
  const [croppedImg, setCroppedImg] = useState('');
  const [coords, setCoords] = useState<any>(null);
  const [image, setImage] = useState<CropperImage | null>(null);
  const [state, setState] = useState<CropperState | null>(null);

  const imageInputRef: { current: HTMLInputElement } = useRef();

  const requery = () => {
    api.gallery.images.loadGallery({ page: 1, size: 10 }).then(({ images }) => {
      setImages(images);
    });
  };

  const onCrop = (cropper: CropperRef) => {
    setCoords(cropper.getCoordinates());

    if (coords) {
      setImage(cropper.getImage());
      setState(cropper.getState());
      setCroppedImg(
        `${cropper.getImage().src.replace('o=true', '')}cw=${coords.width}&ch=${coords.height}&cx=${coords.left}&cy=${coords.top}`
      );
    }
  };

  const openImageInput = () => {
    imageInputRef && imageInputRef.current && imageInputRef.current.click();
  };

  const selectFile = event => {
    const imageUploaded = event.target.files[0];
    setImageData(imageUploaded);
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageData);

    api.gallery.images.save(formData).then(() => {
      requery();
    });
  };

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/img/${imgId}`;
  };

  useEffect(() => {
    requery();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
      <section
        className="whppt-form-section whppt-form-section--bottom-gap"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 360px)', gap: '1rem', flex: '1 1 0' }}>
        {images &&
          images.map((img, index) =>
            index == 0 ? (
              <Cropper
                src={`${getImgUrl(img._id)}?o=true`}
                style={{ height: 200, width: 360, objectFit: 'cover' }}
                onChange={onCrop}
                backgroundClassName={'whppt-cropper-background'}
                stencilProps={{ aspectRatio: 9 / 5 }}
              />
            ) : (
              <div key={index}>
                <img src={getImgUrl(img._id)} style={{ height: 200, width: 360, objectFit: 'cover' }} />
                <p>{img.name}</p>
              </div>
            )
          )}

        <div className="whppt-site-setings__actions right" style={{ height: '5rem' }}>
          <div>
            <WhpptButton text={'Select Image'} onClick={openImageInput} />
            <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={selectFile} />
          </div>
          <WhpptButton text={'Upload'} onClick={uploadImage} />
        </div>
      </section>

      <section className="whppt-form-section whppt-form-section--bottom-gap" style={{ height: '500px', width: '500px' }}>
        {croppedImg && (
          <>
            <CropperPreview image={image} state={state} className="whppt-cropped-preview" />
            <img src={croppedImg} style={{ display: 'none' }} />
          </>
        )}
      </section>
    </div>
  );
};
