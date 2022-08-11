import React, { FC, useState, useEffect } from 'react';
import { WhpptButton, WhpptInput, WhpptDayInput } from '../ui/components';
import { WhpptGalleryTag } from './Components';
import { useWhppt } from '../Context';
import { GalleryItem } from './Model';
import { toast } from 'react-toastify';

type GalleryItemSettingsProps = {
  use: () => void;
  selectedId: string;
  remove: (id: string) => void;
};

export const GalleryItemSettings: FC<GalleryItemSettingsProps> = ({ use, selectedId, remove }) => {
  const { api } = useWhppt();
  const [newTag, setNewTag] = useState('');

  const [created, setCreated] = useState(false);
  const [loading, setLaoding] = useState(true);
  const [error, setError] = useState('');
  const [item, setItem] = useState<GalleryItem>();

  useEffect(() => {
    if (!created) return setCreated(true);
    setLaoding(true);
    if (!selectedId) return setItem(undefined);
    api.gallery
      .load(selectedId)
      .then(resp => setItem(resp.item))
      .catch(err => setError(err.message || err))
      .finally(() => setLaoding(false));
  }, [api.gallery, created, selectedId, setItem]);

  const save = details => {
    const save = api.gallery.save(details);

    return toast.promise(save, {
      pending: 'Saving image details...',
      success: 'Image details saved',
      error: 'Saving image details failed 🤯',
    });
  };

  return (
    <div className="whppt-gallery__settings__container">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <>
          {error ? (
            <div>
              Could not load the settings.
              {error}
            </div>
          ) : (
            <>
              <p className="whppt-gallery__settings__title">{item.fileInfo?.originalname || ''}</p>

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
                    newTag && setItem(item.tags ? { ...item, tags: [newTag, ...item.tags] } : { ...item, tags: [newTag] });
                    setNewTag('');
                  }}>
                  +
                </div>
              </div>

              {item.tags && (
                <>
                  <h3>Tags</h3>
                  <div className="whppt-gallery__settings__tag-container">
                    {item.tags.map((tag, index) => (
                      <WhpptGalleryTag tag={tag} key={index} />
                    ))}
                  </div>
                </>
              )}

              <WhpptDayInput date={item.date} onChange={date => setItem({ ...item, date })} />

              <WhpptInput
                id="alt"
                info=""
                label="Default alt text"
                error=""
                type="text"
                value={(item && item.defaultAltText) || ''}
                onChange={value => {
                  setItem({ ...item, defaultAltText: value });
                }}
              />

              <WhpptInput
                id="caption"
                info=""
                label="Default caption"
                error=""
                type="text"
                value={(item && item.defaultCaption) || ''}
                onChange={value => {
                  setItem({ ...item, defaultCaption: value });
                }}
              />

              <div className="whppt-gallery__settings__action-buttons">
                <WhpptButton text="save" onClick={() => save(item)} />
                <WhpptButton text="delete" onClick={() => remove(item._id)} />
                <WhpptButton text="use" onClick={use} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
