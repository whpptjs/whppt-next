import React, { FC, useState } from 'react';
import { WhpptTab } from '../../ui/components';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTable } from '../../ui/components/Table';
import { WhpptButton } from '../../ui/components/Button';

export const Files: FC<WhpptTab> = () => {
  const headers = [
    { text: 'Name', align: 'start', value: 'name' },
    { text: 'Description', align: 'start', value: 'description' },
    { text: 'Actions', align: 'start', value: 'actions' }
  ] as any;

  const items = [
    {
      name: 'testName.testName.testName.com',
      description: 'description 1',
      actions: ['action1']
    },
    {
      name: 'testName.testName.testName.com',
      description: 'description 2',
      actions: ['action2']
    }
  ] as any;

  const [description, setDescription] = useState('');

  const selectFile = () => {
  }

  const upload = () => {
  }

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id={"Decription"}
          placeholder={"Enter File Description"}
          label={"File Description"}
          value={description}
          onChange={setDescription}
          info={""}
          error={""}
          type="text"
        />

        <div className="whppt-site-setings__actions right">
          <WhpptButton text={"Select File"} onClick={selectFile} />
          <WhpptButton text={"Upload"} onClick={upload} />
        </div>
      </section>

      <section className="whppt-form-section">
        <WhpptTable
          dark={true}
          hideFooters={false}
          items={items}
          headers={headers}
          hideHeaders={false}
          page={1}
          perPage={5}
          total={1}
          dense={true}
          height={''}
          fixedHeader={false}
        />
      </section>
    </form>
  )
}
