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

  useEffect(() => {
    //search('image').then(setImages);
    setImages([
      {
        _id: 'u5sl5rg4b55',
        version: 'v2',
        uploadedOn: '2022-07-19T00:37:00.113Z',
        name: 'Screenshot from 2022-07-18 07-57-01.png',
        type: 'image/png',
      },
      {
        _id: '1ao3l5qewn8w',
        version: 'v2',
        uploadedOn: '2022-07-18T07:15:16.577Z',
        name: 'messi.jpg',
        type: 'image/jpeg',
      },
      {
        _id: '1ao3l5qdolxr',
        version: 'v2',
        uploadedOn: '2022-07-18T06:41:01.670Z',
        name: 'kangaroo.jpeg',
        type: 'image/jpeg',
      },
    ]);
  }, [search]);

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
              onClick={() => setSelectedImage(img)}
            />
          ))}
      </section>

      {selectedImage && (
        <ImageSettings
          useImage={useImage}
          remove={() => {
            remove(selectedImage._id);
          }}
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
};
