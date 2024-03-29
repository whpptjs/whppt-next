import React, { FC, useState } from 'react';
import { WhpptInput } from '../ui/components/Input';
import { WhpptButton, WhpptTextArea, WhpptTab } from '../ui/components';
import { splitKeywords } from '../splitKeywords';
import { TwitterData } from './Model/SettingsData';
import { toast } from 'react-toastify';

type TwitterProps = WhpptTab &
  TwitterData & {
    save: (title, keywords, description) => Promise<unknown>;
  };

export const Twitter: FC<TwitterProps> = ({ save, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [keyWords, setKeywords] = useState((props.keywords && props.keywords.join(', ')) || '');
  const [description, setDescription] = useState(props.description || '');

  const error = '';
  const info = '';

  const confirm = () => {
    const update = save(title, splitKeywords(keyWords), description);

    toast.promise(update, {
      pending: 'Saving...',
      success: 'Twitter settings saved',
      error: 'Twitter settings failed saving 🤯',
    });
  };

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <div>
          <WhpptButton icon="" text="Save Settings" onClick={confirm} />
        </div>
      </section>

      <section className="whppt-form-section whppt-form-page-settings__form whppt-form-section--bottom-gap">
        <WhpptInput id="whppt-plaintext-input" label="Title" type="text" error={error} info={info} value={title} onChange={setTitle} />
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
    </form>
  );
};
