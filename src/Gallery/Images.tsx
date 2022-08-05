import React, { FC } from 'react';
import { WhpptImageUploader } from '../ui/components/ImageUploader';
import { WhpptGalleryImage } from '../ui/components/GalleryImage';
import { GalleryTab } from './GalleryTab';
import { useWhppt } from '..';

export const Images: FC<GalleryTab> = ({ items, upload, setSelected, selectedId }) => {
  const { domain } = useWhppt();

  const getImgUrl = imgId => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${imgId}?w=360`;
  };

  const uploadImage = newFile => {
    const file = new FormData();
    file.append('file', newFile);
    file.append('type', 'image');
    file.append('domainId', domain._id);
    upload(file);
  };

  return (
    <section className="whppt-gallery whppt-gallery__main-container">
      <div className="whppt-gallery__grid">
        <WhpptImageUploader uploadImage={uploadImage} />
        {items &&
          items.map(img => (
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