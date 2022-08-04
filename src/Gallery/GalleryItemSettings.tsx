import React, { FC, useState, useEffect } from 'react';
import { WhpptButton, WhpptInput, WhpptDayInput } from '../ui/components';
import { WhpptGalleryTag } from './GalleryTag';
import { FileDetails } from '../Api/Http';
import { useWhppt } from '../Context';

type GalleryItemSettingsProps = {
  use: () => void;
  selected: FileDetails;
  remove: (id: string) => void;
  save: (details: any) => void;
  setSelected: ({}) => void;
};

export const GalleryItemSettings: FC<GalleryItemSettingsProps> = ({ use, selected, remove, setSelected, save }) => {
  const { api } = useWhppt();
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    api.gallery.load(selected._id).then(({ item }) => setSelected({ ...selected, ...item }));
  }, []);

  return (
    <div className="whppt-gallery__settings__container">
      <p className="whppt-gallery__settings__title">{selected?.name || ''}</p>

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

      <WhpptDayInput date={selected.date} onChange={date => setSelected({ ...selected, date })} />

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
        <WhpptButton text="save" onClick={() => save(selected)} />
        <WhpptButton text="delete" onClick={() => remove(selected._id)} />
        <WhpptButton text="use" onClick={use} />
      </div>
    </div>
  );
};
