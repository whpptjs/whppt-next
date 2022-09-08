import React, { FC } from 'react';
import { WhpptGalleryUploader } from '.';
import { GalleryTab } from '../Model';
import { useWhppt } from '../../Context';

export const WhpptGalleryTab: FC<GalleryTab> = ({ type, items, upload, setSelected, selectedId, Component }) => {
  console.log('🚀 ~ file: GalleryTab.tsx ~ line 7 ~ type', type);
  const { domain } = useWhppt();

  const uploadItem = newFile => {
    const file = new FormData();
    file.append('file', newFile);
    file.append('type', type);
    file.append('domainId', domain._id);
    upload(file);
  };

  return (
    <section className="whppt-gallery whppt-gallery__main-container">
      <div className={`whppt-gallery-grid whppt-gallery-grid__${type}`}>
        <WhpptGalleryUploader upload={uploadItem} type={type} />
        {items &&
          items.map(item => (
            <Component
              key={item._id}
              id={item._id}
              name={item.fileInfo?.originalname}
              onClick={e => {
                e.target?.scrollIntoView && e.target.scrollIntoView({ behavior: 'smooth' });
                setSelected(item);
              }}
              isSelected={selectedId == item._id}
            />
          ))}
      </div>
    </section>
  );
};
