import React, { FC, useState } from 'react';
import { WhpptButton, WhpptHeading, WhpptInput, WhpptGalleryTag } from '../ui/components';
import { FileDetails } from '../Api/Http';
import { DayPicker } from 'react-day-picker';

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));

  return (
    <div className="whppt-gallery__settings__container">
      <WhpptHeading text={selected.name}></WhpptHeading>

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
        <div className="whppt-gallery__settings__tag-add" onClick={() => setSelected({ ...selected, tags: [newTag, ...selected.tags] })}>
          +
        </div>
      </div>

      {selected.tags && (
        <>
          <h3>Tags</h3>
          <div className="whppt-gallery__settings__tag-container">
            {selected.tags.map((tag, index) => (
              <WhpptGalleryTag tag={tag} key={index} />
            ))}
          </div>
        </>
      )}

      {suggestedTags && (
        <>
          <h3>Suggested tags</h3>
          <div className="whppt-gallery__settings__tag-container">
            {suggestedTags.map((tag, index) => (
              <WhpptGalleryTag tag={tag} key={index} />
            ))}
          </div>
        </>
      )}

      <div className="whppt-gallery__day-picker__container">
        <h3>Date</h3>
        <div onClick={() => setShowCalendar(!showCalendar)} style={{ cursor: 'pointer !important' }}>
          <WhpptInput value={date.toString()} />
        </div>

        {showCalendar ? (
          <DayPicker
            className="whppt-gallery__day-picker__calendar"
            fixedWeeks={true}
            onDayClick={date => {
              setDate(date.toLocaleDateString('en-GB'));
              setShowCalendar(false);
            }}
          />
        ) : null}
      </div>

      <WhpptInput
        id="alt"
        info=""
        label="Default alt text"
        error=""
        type="text"
        value={selected.defaultAlt || ''}
        onChange={value => setSelected({ ...selected, defaultAlt: value })}
      />

      <WhpptInput
        id="caption"
        info=""
        label="Default caption"
        error=""
        type="text"
        value={selected.defaultCaption || ''}
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
