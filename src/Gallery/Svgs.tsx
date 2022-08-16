import React, { FC } from 'react';
import { WhpptGalleryUploader } from './Components';
import { GalleryTab } from './Components';
import { useWhppt } from '../Context';
import { WhpptGallerySvg } from './Components';

export const Svgs: FC<GalleryTab> = ({ items, upload, setSelected, selectedId }) => {
  const { domain } = useWhppt();

  const uploadSvg = newFile => {
    const file = new FormData();
    file.append('file', newFile);
    file.append('type', 'svg');
    file.append('domainId', domain._id);
    upload(file);
  };

  return (
    <section className="whppt-gallery whppt-gallery__main-container">
      <div className="whppt-gallery-grid whppt-gallery-grid__svgs">
        <WhpptGalleryUploader upload={uploadSvg} />
        {items &&
          items.map(item => (
            <WhpptGallerySvg
              key={item._id}
              itemId={item._id}
              name={item.fileInfo?.originalname}
              onClick={() => setSelected(item)}
              isSelected={selectedId == item._id}
            />
          ))}
      </div>
    </section>
  );
};
