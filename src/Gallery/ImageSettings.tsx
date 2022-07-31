import React, { FC, useState, useEffect } from 'react';
import { WhpptButton, WhpptInput, WhpptGalleryTag, WhpptIcon } from '../ui/components';
import { FileDetails } from '../Api/Http';
import { DayPicker } from 'react-day-picker';
import { useWhppt } from '../Context';

type ImageSettingsProps = {
  use: () => void;
  selected: FileDetails;
  remove: (id: string) => void;
  save: (details: any) => void;
  setSelected: ({}) => void;
};

export const ImageSettings: FC<ImageSettingsProps> = ({ use, selected, remove, setSelected, save }) => {
  const { api } = useWhppt();
  const [newTag, setNewTag] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    api.gallery.load(selected._id).then(({ item }) => setSelected({ ...selected, ...item }));
  }, []);

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

      <div className="whppt-gallery__day-picker__container">
        <div
          className="whppt-image-editor__date-picker-input"
          onClick={() => setShowCalendar(!showCalendar)}
          style={{ cursor: 'pointer !important' }}>
          <WhpptInput
            id="date"
            label="Date"
            info=""
            error=""
            type="text"
            value={(selected.date && new Date(selected.date).toLocaleDateString('en-GB')) || new Date().toLocaleDateString('en-US')}
          />

          <div className={`whppt-image-editor__date-picker-icon ${showCalendar ? 'up' : 'down'}`}>
            <WhpptIcon is="down" />
          </div>
        </div>

        {showCalendar ? (
          <DayPicker
            className="whppt-gallery__day-picker__calendar"
            fixedWeeks={true}
            onDayClick={date => {
              setSelected({ ...selected, date });
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
        value={(selected && selected.defaultAltText) || ''}
        onChange={value => {
          setSelected({ ...selected, defaultAltText: value });
        }}
      />

      <WhpptInput
        id="caption"
        info=""
        label="Default caption"
        error=""
        type="text"
        value={(selected && selected.defaultCaption) || ''}
        onChange={value => {
          setSelected({ ...selected, defaultCaption: value });
        }}
      />

      <div className="whppt-gallery__settings__action-buttons">
        <WhpptButton text="use" onClick={() => saveDetailsAndEdit()} />
        <WhpptButton text="delete" onClick={() => remove(selected._id)} />
      </div>
    </div>
  );
};
