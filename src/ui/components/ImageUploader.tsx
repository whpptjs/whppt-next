import React, { FC, useRef } from 'react';

type WhpptImageUploaderProps = {
  uploadImage: (any) => void;
};

export const WhpptImageUploader: FC<WhpptImageUploaderProps> = ({ uploadImage }) => {
  const imageInputRef: { current: HTMLInputElement } = useRef();

  const openImageInput = () => {
    imageInputRef && imageInputRef.current && imageInputRef.current.click();
  };

  const selectFile = event => {
    const imageUploaded = event.target.files[0];
    uploadImage(imageUploaded);
  };

  return (
    <div>
      <div className="whppt-image-uploader" onClick={openImageInput}>
        <span>+</span>
      </div>
      <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={selectFile} />
    </div>
  );
};
