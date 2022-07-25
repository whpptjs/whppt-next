import React, { FC, useEffect, useState } from 'react';
import { useWhppt } from '../Context';
import { FileDetails } from '../Api/Http';
import { WhpptImageUploader } from '../ui/components/ImageUploader';
import { WhpptGalleryImage } from '../ui/components/GalleryImage';
import { GalleryTab } from './GalleryTab';
import { ImageSettings } from './ImageSettings';

export const Images: FC<GalleryTab> = ({ search, upload, save, remove }) => {
  const { gallery, hideGallery } = useWhppt();
  const [images, setImages] = useState<FileDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState<FileDetails>();

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/img/${imgId}`;
  };

  const uploadImage = newFile => {
    upload(newFile).then(fileDetails => setImages([fileDetails, ...images]));
  };

  const useImage = () => {
    gallery.use(selectedImage);
    hideGallery();
  };

  const getSuggestedTags = image => {
    return ['parent', 'dog', 'landscape'];
  };

  useEffect(() => {
    search('image').then(setImages);
  }, [search]);

  return (
    <section className="whppt-gallery whppt-gallery__main-container">
      <div className="whppt-gallery__grid">
        <WhpptImageUploader uploadImage={uploadImage} />
        {images &&
          images.map(img => (
            <WhpptGalleryImage
              key={img._id}
              url={getImgUrl(img._id)}
              remove={() => remove(img._id)}
              name={img.name}
              onClick={() => setSelectedImage(img)}
              isSelected={selectedImage && selectedImage._id === img._id}
            />
          ))}
      </div>

      <div className={`whppt-gallery__image-settings ${selectedImage ? 'whppt-gallery__image-settings--active' : ''}`}>
        {selectedImage && (
          <ImageSettings
            useImage={useImage}
            remove={() => {
              remove(selectedImage._id);
            }}
            save={save}
            suggestedTags={getSuggestedTags(selectedImage)}
            selectedImage={selectedImage}
          />
        )}
      </div>
    </section>
  );
};
