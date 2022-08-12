import React, { FC } from 'react';
import { WhpptGalleryUploader } from './Components';
import { GalleryTab } from './Components';
import { useWhppt } from '../Context';
import { WhpptGallerySvg } from './Components';

export const Svgs: FC<GalleryTab> = ({ items, upload }) => {
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
      <div className="whppt-gallery-grid whppt-gallery-grid--svgs">
        <WhpptGalleryUploader upload={uploadSvg} />
        {items && items.map(({ fileInfo, _id }, index) => <WhpptGallerySvg key={index} itemId={_id} name={fileInfo?.originalname} />)}
      </div>
    </section>
  );
};
