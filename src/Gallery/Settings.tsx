import React, { FC, useState } from 'react';
import { WhpptButton, WhpptHeading, WhpptInput } from '../ui/components';
import { FileDetails } from '../Api/Http';

type SettingsProps = {
  use: () => void;
  selected: FileDetails;
  remove: () => void;
  save: () => void;
  suggestedTags: any[];
};

export const Settings: FC<SettingsProps> = ({ use, selected, remove, suggestedTags }) => {
  const [defaultAltText, setDefaultAltText] = useState('');
  const [defaultCaption, setDefaultCaption] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="whppt-gallery__image-settings__container">
      <WhpptHeading text={selected.name}></WhpptHeading>
      <WhpptInput value="" type="text" info="Type your new tag here and add it with the +" />

      {selected.tags && (
        <div>
          <h3>Tags</h3>
          <div className="whppt-gallery__image-settings__tag-container">
            {selected.tags.map((tag, index) => (
              <span className="whppt-gallery__image-settings__tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {suggestedTags && (
        <div>
          <h3>Suggested tags</h3>
          <div className="whppt-gallery__image-settings__tag-container">
            {suggestedTags.map((tag, index) => (
              <span className="whppt-gallery__image-settings__tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3>Date</h3>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ color: 'black' }}></input>
      </div>

      <WhpptInput value={defaultAltText} label="Default alt text" onChange={setDefaultAltText} />

      <WhpptInput value={defaultCaption} label="Default caption" onChange={setDefaultCaption} />

      <div>
        <span>Used 8 times in 4 pages (dependencies)</span>
      </div>

      <div className="whppt-gallery__image-settings__action-buttons">
        <WhpptButton text="use" onClick={use} />
        <WhpptButton text="delete" onClick={remove} />
      </div>
    </div>
  );
};
