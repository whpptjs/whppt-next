import React, { FC, useState } from 'react';
import { WhpptButton, WhpptHeading, WhpptInput, WhpptGalleryTag } from '../ui/components';
import { FileDetails } from '../Api/Http';

type SettingsProps = {
  use: () => void;
  selected: FileDetails;
  remove: () => void;
  save: () => void;
  suggestedTags: any[];
  setSelected: ({}) => void;
};

export const Settings: FC<SettingsProps> = ({ use, selected, remove, suggestedTags, setSelected }) => {
  const [newTag, setNewTag] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="whppt-gallery__settings__container">
      <WhpptHeading text={(selected && selected.name) || ''}></WhpptHeading>

      <div className="whppt-gallery__settings__tag-input">
        <WhpptInput
          value={newTag}
          onChange={setNewTag}
          id="new-tag"
          label=""
          error=""
          type="text"
          info="Type your new tag here and add it with the +"
        />
        <div
          className="whppt-gallery__settings__tag-add"
          onClick={() => {
            setSelected(selected.tags ? { ...selected, tags: [newTag, ...selected.tags] } : { ...selected, tags: [newTag] });
            setNewTag('');
          }}>
          +
        </div>
      </div>

      {selected && selected.tags && (
        <>
          <h3>Tags</h3>
          <div className="whppt-gallery__settings__tag-container">
            {selected.tags.map((tag, index) => (
              <WhpptGalleryTag tag={tag} key={index} />
            ))}
          </div>
        </>
      )}

      {selected && suggestedTags && (
        <>
          <h3>Suggested tags</h3>
          <div className="whppt-gallery__settings__tag-container">
            {suggestedTags.map((tag, index) => (
              <WhpptGalleryTag tag={tag} key={index} />
            ))}
          </div>
        </>
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

      <WhpptInput
        id="alt"
        info=""
        label="Default alt text"
        error=""
        type="text"
        value={(selected && selected.defaultAlt) || ''}
        onChange={value => setSelected({ ...selected, defaultAlt: value })}
      />

      <WhpptInput
        id="caption"
        info=""
        label="Default caption"
        error=""
        type="text"
        value={(selected && selected.defaultCaption) || ''}
        onChange={value => setSelected({ ...selected, defaultCaption: value })}
      />

      <div>
        <span>Used 8 times in 4 pages (dependencies)</span>
      </div>

      <div className="whppt-gallery__settings__action-buttons">
        <WhpptButton text="use" onClick={use} />
        <WhpptButton text="delete" onClick={remove} />
      </div>
    </div>
  );
};
