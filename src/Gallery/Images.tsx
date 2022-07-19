import React, { FC, useEffect, useState } from 'react';
import { WhpptTab } from '../ui/components';
import { useWhppt } from '../Context';
import { Image } from './Model/Image';
import { WhpptImageUploader } from '../ui/components/ImageUploader';
import { WhpptGalleryImage } from '../ui/components/GalleryImage';

export const Images: FC<WhpptTab> = () => {
  const { api, imageEditor, setImageEditor, toggleGallery } = useWhppt();
  const [images, setImages] = useState<Image[]>([]);

  const requery = () => {
    api.gallery.images.loadGallery({ page: 1, size: 10 }).then(({ images }) => {
      setImages(images);
    });
  };

  const uploadImage = imageData => {
    const formData = new FormData();
    formData.append('file', imageData);

    api.gallery.images.save(formData).then(image => {
      setImages([image, ...images]);
    });
  };

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/img/${imgId}`;
  };

  const remove = id => {
    api.gallery.images.remove(id).then(() => {
      setImages(images.filter(({ _id }) => _id !== id));
    });
  };

  useEffect(() => {
    requery();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
      <section
        className="whppt-form-section whppt-form-section--bottom-gap"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 360px)', gap: '1rem', flex: '1 1 0' }}>
        <WhpptImageUploader uploadImage={uploadImage} />

        {images &&
          images.map(img => (
            <WhpptGalleryImage
              key={img._id}
              url={getImgUrl(img._id)}
              remove={() => remove(img._id)}
              name={img.name}
              onClick={() => {
                setImageEditor({ ...imageEditor, visible: true, imageToCrop: img });
                toggleGallery();
              }}
            />
          ))}
      </section>
    </div>
  );
};
