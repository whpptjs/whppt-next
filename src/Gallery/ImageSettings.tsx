import React, { FC } from 'react';
import { WhpptButton, WhpptHeading, WhpptInput } from '../ui/components';
import { FileDetails } from '../Api/Http';

type ImageSettingsProps = {
  useImage: () => void;
  selectedImage: FileDetails;
  remove: () => void;
};

export const ImageSettings: FC<ImageSettingsProps> = ({ useImage, selectedImage, remove }) => {
  return (
    <section className="whppt-form-section whppt-form-section--bottom-gap" style={{ flex: '1 1 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <WhpptHeading text={selectedImage.name}></WhpptHeading>
        <WhpptInput value="" type="text" info="Type your new tag here and add it with the +" />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <WhpptButton text="use" onClick={useImage} />
          <WhpptButton text="delete" onClick={remove} />
        </div>
      </div>
    </section>
  );
};
