import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptTab } from '../index';
import { Button } from './../../ui/components/Button';
import { Checkbox } from '../../ui/components/Checkbox';

export const Seo: FC<WhpptTab> = () => {
  const [title, setTitle] = useState('');
  const [keyWords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [changeFrequency, setChangeFrequency] = useState('');
  const [hideFromXML, setHideFromXML] = useState(false);

  const error = '';
  const info = '';

  const submit = () => {
    // const keyWordsArray = keyWords.replace(/ +/g, '').split(',');
    // const seoSettings = {
    //   title,
    //   keyWords,
    //   description,
    //   priority: {
    //     priorityLevel,
    //     changeFrequency
    //   },
    //   hideFromXML
    // }
    // setPage(...page, seoSettings)
  }

  const handleCheckBox = () => {
    setHideFromXML(!hideFromXML);
  }

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
         <WhpptInput
          id="whppt-plaintext-input"
          label="Description"
          type="text"
          error={error}
          info={info}
          value={description}
          onChange={setDescription}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label="Priority"
          type="text"
          error={error}
          info={info}
          value={priorityLevel}
          onChange={setPriorityLevel}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label=""
          type="text"
          error={error}
          info={info}
          value={changeFrequency}
          onChange={setChangeFrequency}
        />
        <Checkbox
          dark={false}
          label={"HIDE THIS PAGE FROM THE SITEMAP XML?"}
          value={'hide-from-xml'}
          onChange={() => handleCheckBox()}
        />
      </section>

      <section className="whppt-section-actions">
        <Button text="Save Settings" onClick={submit}/>
      </section>
    </form>
  );
}
