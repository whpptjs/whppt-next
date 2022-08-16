import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { WhpptTab } from '../../ui/components';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTable } from '../../ui/components/Table';
import { WhpptButton } from '../../ui/components/Button';
import { useWhppt } from '../../Context';

export const Files: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Actions', value: 'actions' },
  ] as any;

  const { api } = useWhppt();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [errorState, setError] = useState<Error>();
  const [fileData, setFileData] = useState<File>(null);

  const fileInputRef: { current: HTMLInputElement } = useRef();

  const requery = useCallback(() => {
    api.site.files
      .load({ page: currentPage, size: perPage })
      .then(({ files, total }) => {
        Array.isArray(files) && setItems(files);
        total && setTotal(total);
      })
      .catch(err => setError(err));
  }, [api.site.files, currentPage, perPage]);

  // TODO: Handle double call + loading and error states
  useEffect(() => {
    requery();
  }, [requery, currentPage, perPage]);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const openFileInput = () => {
    fileInputRef && fileInputRef.current && fileInputRef.current.click();
  };

  const selectFile = event => {
    const fileUploaded = event.target.files[0];
    setFileData(fileUploaded);
  };

  const upload = () => {
    const formData = new FormData();
    formData.append('file', fileData);
    formData.append('description', description);

    api.site.files.saveFile(formData).then(() => {
      requery();
      resetInputs();
    });
  };

  const resetInputs = () => {
    setDescription('');
    setFileData(null);
  };

  return (
    <form className="whppt-form ">
      <div className="whppt-form__actions">
        <section className="whppt-form-section whppt-form-section--bottom-gap">
          <h4 className="whppt-form__content--header">Add new File</h4>
          <WhpptInput
            id={'Decription'}
            placeholder={'Enter File Description'}
            label={'File Description'}
            value={description}
            onChange={setDescription}
            info={''}
            error={errorState && errorState.message}
            type="text"
          />

          <div className="whppt-site-setings__actions right">
            <div>
              <WhpptButton text={(fileData && fileData.name) || 'Select File'} onClick={openFileInput} />
              <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={selectFile} />
            </div>
            <WhpptButton text={'Upload'} onClick={upload} />
          </div>
        </section>
      </div>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          <h4 className="whppt-form__content--header">Files</h4>

          <WhpptTable
            hideFooters={false}
            items={items}
            headers={headers}
            hideHeaders={false}
            page={currentPage}
            perPage={perPage}
            total={total}
            dense={true}
            height={''}
            fixedHeader={false}
            setCurrentPage={handlePageChange}
            setPerPage={setPerPage}
          />
        </section>
      </div>
    </form>
  );
};
