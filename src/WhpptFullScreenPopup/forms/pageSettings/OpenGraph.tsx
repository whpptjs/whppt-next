import React, { FC, useState } from 'react';
import { WhpptInput } from '../../../ui/components/Input';
import { WhpptTab } from '../../index';
import { WhpptButton } from '../../../ui/components/Button';
import { WhpptTextArea } from '../../../ui/components/TextArea';

export const OpenGraph: FC<WhpptTab> = () => {
  const [title, setTitle] = useState('');
  const [keyWords, setKeywords] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    //const keyWordsArray = keyWords.replace(/ +/g, '').split(',');
    //const openGraphSettings = { title, description, keywords: keyWordsArray};
    //setPage(...page, openGraphSettings)
  };

  const error = '';
  const info = '';

  return (
    <form className="whppt-form">
      <section className="whppt-form-section">
        <WhpptInput
          id="whppt-plaintext-input"
          label="Title"
          type="text"
          error={error}
          info={info}
          value={title}
          onChange={setTitle}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label="Keywords"
          type="text"
          error={error}
          info={info}
          value={keyWords}
          onChange={setKeywords}
        />
        <WhpptTextArea
          id="whppt-plaintext-input"
          label="Description"
          error={error}
          info={info}
          value={description}
          onChange={setDescription}
        />
      </section>

      <section className="whppt-section-actions">
        <WhpptButton text="Save Settings" onClick={submit} />
      </section>
    </form>
  );
};
