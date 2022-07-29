import React, { FC, useEffect, useState } from 'react';
import { ImageData } from './Model/Image';
import { WhpptImageUploader } from '../ui/components/ImageUploader';
import { WhpptGalleryImage } from '../ui/components/GalleryImage';
import { GalleryTab } from './GalleryTab';

export const Images: FC<GalleryTab> = ({ search, upload, setSelected, selectedId, domainId }) => {
  const [images, setImages] = useState<ImageData[]>([]);

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${imgId}`;
  };

  const uploadImage = newFile => {
    const file = new FormData();
    file.append('file', newFile);
    file.append('type', 'image');
    file.append('domainId', domainId);
    upload(file).then(fileDetails => {
      setImages([fileDetails, ...images]);
    });
  };

  useEffect(() => {
    search('image').then(setImages);
  }, []);

  return (
    <section className="whppt-gallery whppt-gallery__main-container">
      <div className="whppt-gallery__grid">
        <WhpptImageUploader uploadImage={uploadImage} />
        {images &&
          images.map(img => (
            <WhpptGalleryImage
              key={img._id}
              url={getImgUrl(img._id)}
              name={img.name}
              onClick={() => setSelected(img)}
              isSelected={selectedId == img._id}
            />
          ))}
      </div>
    </section>
  );
};
