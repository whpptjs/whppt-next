import React, { FC, useRef } from 'react';

type WhpptImageUploaderProps = {
  uploadImage: (file: File) => void;
};

export const WhpptImageUploader: FC<WhpptImageUploaderProps> = ({ uploadImage }) => {
  const imageInputRef: { current: HTMLInputElement } = useRef();

  const openImageInput = () => {
    imageInputRef && imageInputRef.current && imageInputRef.current.click();
  };

  const selectFile: React.ChangeEventHandler = event => {
    const imageUploaded: File = (event.target as HTMLInputElement)?.files[0];
    uploadImage(imageUploaded);
  };

  return (
    <button>
      <div className="whppt-image-uploader" onClick={openImageInput}>
        <span>+</span>
      </div>
      <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={selectFile} />
    </button>
  );
};
