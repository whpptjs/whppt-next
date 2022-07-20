import React, { FC, useEffect, useState } from 'react';
import { FileDetails } from '../Api/Http';
import { WhpptImageUploader } from '../ui/components/ImageUploader';
import { WhpptGalleryImage } from '../ui/components/GalleryImage';
import { GalleryTab } from './GalleryTab';

export const Images: FC<GalleryTab> = ({ search, upload, save, remove, setSelected, selectedId }) => {
  const [images, setImages] = useState<FileDetails[]>([]);

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/img/${imgId}`;
  };

  const uploadImage = newFile => {
    upload(newFile).then(fileDetails => setImages([fileDetails, ...images]));
  };

  useEffect(() => {
    //search('image').then(setImages);
    setImages([
      {
        _id: 'cddl5sp7wjg',
        version: 'v2',
        uploadedOn: '2022-07-19T21:39:30.000Z',
        name: 'wave.jpeg',
        type: 'image/jpeg',
        tags: ['parent', 'dog', 'landscape'],
      },
      {
        _id: 'cddl5sp7opi',
        version: 'v2',
        uploadedOn: '2022-07-19T21:39:20.146Z',
        name: 'messi.jpg',
        type: 'image/jpeg',
        tags: ['parent', 'dog', 'landscape'],
      },
      {
        _id: 'cddl5sp7i0e',
        version: 'v2',
        uploadedOn: '2022-07-19T21:39:11.517Z',
        name: 'messi.jpg',
        type: 'image/jpeg',
        tags: ['parent', 'dog', 'landscape'],
      },
      {
        _id: 'u5sl5rskioq',
        version: 'v2',
        uploadedOn: '2022-07-19T06:25:31.586Z',
        name: 'messi.jpg',
        type: 'image/jpeg',
      },
      {
        _id: 'u5sl5rskeaj',
        version: 'v2',
        uploadedOn: '2022-07-19T06:25:25.552Z',
        name: 'wave.jpeg',
        type: 'image/jpeg',
      },
      {
        _id: 'u5sl5rsk7pj',
        version: 'v2',
        uploadedOn: '2022-07-19T06:25:17.039Z',
        name: 'messirve.jpg',
        type: 'image/jpeg',
      },
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
              onClick={() => setSelected(img)}
              isSelected={selectedId === img._id}
            />
          ))}
      </div>
    </section>
  );
};
