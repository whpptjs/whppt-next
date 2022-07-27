import React, { FC, useState } from 'react';
import { WhpptButton, WhpptInput, WhpptGalleryTag, WhpptIcon } from '../ui/components';
import { FileDetails } from '../Api/Http';
import { DayPicker } from 'react-day-picker';

type ImageSettingsProps = {
  use: () => void;
  selected: FileDetails;
  remove: (id: string) => void;
  save: (details: any) => void;
  suggestedTags: any[];
  setSelected: ({}) => void;
};

export const ImageSettings: FC<ImageSettingsProps> = ({ use, selected, remove, suggestedTags, setSelected, save }) => {
  const [newTag, setNewTag] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));

  const addDefaultAlt = value => {
    setSelected({ ...selected, defaultAlt: value });
  };

  const addDefaultCaption = value => {
    setSelected({ ...selected, defaultCaption: value });
  };

  const saveDetailsAndEdit = () => {
    save(selected);
    use();
  };

  return (
    <div className="whppt-gallery__settings__container">
      <p className="whppt-gallery__settings__title">{(selected && selected.name) || ''}</p>

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
            newTag && setSelected(selected.tags ? { ...selected, tags: [newTag, ...selected.tags] } : { ...selected, tags: [newTag] });
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

      <div className="whppt-gallery__day-picker__container">
        <div
          className="whppt-image-editor__date-picker-input"
          onClick={() => setShowCalendar(!showCalendar)}
          style={{ cursor: 'pointer !important' }}>
          <WhpptInput id="date" label="Date" info="" error="" type="text" value={date.toString()} />

          <div className={`whppt-image-editor__date-picker-icon ${showCalendar ? 'up' : 'down'}`}>
            <WhpptIcon is="down" />
          </div>
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
        value={(selected && selected.defaultAlt) || ''}
        onChange={value => addDefaultAlt(value)}
      />

      <WhpptInput
        id="caption"
        info=""
        label="Default caption"
        error=""
        type="text"
        value={(selected && selected.defaultCaption) || ''}
        onChange={value => addDefaultCaption(value)}
      />

      <div>
        <span>Used 8 times in 4 pages (dependencies)</span>
      </div>

      <div className="whppt-gallery__settings__action-buttons">
        <WhpptButton text="use" onClick={() => saveDetailsAndEdit()} />
        <WhpptButton text="delete" onClick={() => remove(selected._id)} />
      </div>
    </div>
  );
};
