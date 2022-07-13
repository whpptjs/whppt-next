import React, { FC, useState, useEffect, useRef } from 'react';
import { WhpptTab } from '../../ui/components';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTable } from '../../ui/components/Table';
import { WhpptButton } from '../../ui/components/Button';
import { useWhppt } from '../../Context';

export const Files: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Name', align: 'start', value: 'name' },
    { text: 'Description', align: 'start', value: 'description' },
    { text: 'Actions', align: 'start', value: 'actions' },
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

  useEffect(() => {
    api.site.files
      .load({ page: currentPage, size: perPage })
      .then(({ files, total }) => {
        Array.isArray(files) && setItems(files);
        total && setTotal(total);
      })
      .catch(err => setError(err));
  }, [currentPage, perPage]);

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

    api.site.files.saveFile(formData);
  };

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
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

      <section className="whppt-form-section">
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
    </form>
  );
};
