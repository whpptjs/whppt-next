import React, { FC, useRef } from 'react';
import { GalleryFileType } from '../Model';
import { GalleryFileExtensions } from './GalleryFileExtensions';
import { toast } from 'react-toastify';

type WhpptGalleryUploaderProps = {
  upload: (file: File) => void;
  type: GalleryFileType;
};

export const WhpptGalleryUploader: FC<WhpptGalleryUploaderProps> = ({ upload, type }) => {
  const fileInputRef: { current: HTMLInputElement } = useRef();

  const openFileInput = () => {
    fileInputRef && fileInputRef.current && fileInputRef.current.click();
  };

  const selectFile: React.ChangeEventHandler = event => {
    const fileUploaded: File = (event.target as HTMLInputElement)?.files[0];
    const extension = fileUploaded.name.split('.')[1];
    GalleryFileExtensions[type].includes(extension)
      ? upload(fileUploaded)
      : toast.error(
          <div>
            <span>Unsupported file type.</span>
            <br></br>
            <span>
              Supported file{' '}
              {GalleryFileExtensions[type].length > 1
                ? `types are ${GalleryFileExtensions[type].join(', ')}.`
                : `type is ${GalleryFileExtensions[type][0]}.`}
            </span>
          </div>
        );
  };

  return (
    <button className="whppt-gallery-uploader">
      <div className="whppt-gallery-uploader__div" onClick={openFileInput}>
        <span>+</span>
      </div>
      <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={selectFile} />
    </button>
  );
};
