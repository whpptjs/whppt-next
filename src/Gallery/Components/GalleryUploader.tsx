import React, { FC, useRef } from 'react';

type WhpptImageUploaderProps = {
  upload: (file: File) => void;
};

export const WhpptGalleryUploader: FC<WhpptImageUploaderProps> = ({ upload }) => {
  const imageInputRef: { current: HTMLInputElement } = useRef();

  const openImageInput = () => {
    imageInputRef && imageInputRef.current && imageInputRef.current.click();
  };

  const selectFile: React.ChangeEventHandler = event => {
    const imageUploaded: File = (event.target as HTMLInputElement)?.files[0];
    upload(imageUploaded);
  };

  return (
    <button className="whppt-gallery-uploader">
      <div className="whppt-gallery-uploader__div" onClick={openImageInput}>
        <span>+</span>
      </div>
      <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={selectFile} />
    </button>
  );
};
