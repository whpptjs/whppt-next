import React, { FC, useState } from 'react';
import { WhpptInput } from '../ui/components/Input';
import { splitKeywords } from '../helpers';
import { SeoData } from './Model/SettingsData';
import { toast } from 'react-toastify';

import { WhpptButton, WhpptTextArea, WhpptTab } from '../ui/components';

type SeoProps = WhpptTab &
  SeoData & {
    save: (title, keywords, description, priority, frequency) => Promise<unknown>;
  };

export const Seo: FC<SeoProps> = ({ save, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [keyWords, setKeywords] = useState((props.keywords && props.keywords.join(', ')) || '');
  const [description, setDescription] = useState(props.description || '');
  const [priority, setPriority] = useState(props.priority || '');
  const [frequency, setFrequency] = useState(props.frequency || '');

  const error = '';
  const info = '';

  const confirm = () => {
    const update = save(title, splitKeywords(keyWords), description, priority, frequency);

    toast.promise(update, {
      pending: 'Saving...',
      success: 'Seo settings saved',
      error: 'Seo settings failed saving 🤯',
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
        <WhpptInput
          id="whppt-plaintext-input"
          label="Priority"
          type="text"
          placeholder=""
          error={error}
          info={'Set page priority'}
          value={priority}
          onChange={setPriority}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label=""
          type="text"
          placeholder=""
          error={error}
          info={'Set page frequency'}
          value={frequency}
          onChange={setFrequency}
        />
      </section>
    </form>
  );
};
