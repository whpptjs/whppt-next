import React, { FC, useState, useEffect, useMemo } from 'react';
import { WhpptButton, WhpptInput, WhpptDayInput, WhpptIcon } from '../ui/components';
import { WhpptGalleryTag } from './Components/GalleryTag';
import { useWhppt } from '../Context';
import { GalleryItem } from './Model';
import { toast } from 'react-toastify';
import { BuildDocUrl } from '../Editor/Link/File';

type GalleryItemSettingsProps = {
  use: (item: GalleryItem) => void;
  type?: string;
  selectedId: string;
  remove: (id: string) => void;
  close: () => void;
};

export const GalleryItemSettings: FC<GalleryItemSettingsProps> = ({ use, type, selectedId, remove, close }) => {
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

  const formatFileName = (filename: string) => {
    const filenameSplit = filename.split('.');
    return (
      <>
        <span className="whppt-gallery-settings__title__name">{filenameSplit[0]}</span>
        <span>{'.'}</span>
        <span>{filenameSplit[1]}</span>
      </>
    );
  };

  const getFileUrl = useMemo(() => {
    return BuildDocUrl(selectedId, item?.fileInfo?.originalname);
  }, [item?.fileInfo?.originalname, selectedId]);

  return (
    <div className="whppt-gallery-settings__container">
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
              <div className="whppt-gallery-settings__header">
                {item.fileInfo && <p className="whppt-gallery-settings__title">{formatFileName(item.fileInfo.originalname)}</p>}

                <button className="whppt-gallery-settings__icon" onClick={() => close()}>
                  <WhpptIcon is="close" />
                </button>
              </div>

              <div className="whppt-gallery-settings__tag-input">
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
                  className="whppt-gallery-settings__tag-add"
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
                  <div className="whppt-gallery-settings__tag-container">
                    {item.tags.map((tag, index) => (
                      <WhpptGalleryTag tag={tag} key={index} />
                    ))}
                  </div>
                </>
              )}

              <WhpptDayInput date={item.date} onChange={date => setItem({ ...item, date })} />

              {item.type === 'image' && (
                <>
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
                </>
              )}
              {type === 'doc' ? (
                <div>
                  <a className="whppt-gallery-settings__preview" href={getFileUrl} target="_black">
                    Preview Document
                  </a>
                </div>
              ) : (
                <></>
              )}

              <div className="whppt-gallery-settings__action-buttons">
                <WhpptButton text="save" onClick={() => save(item)} />
                <WhpptButton text="delete" onClick={() => remove(item._id)} />
              </div>

              {use ? (
                <div className="whppt-gallery-settings__action-buttons--submit">
                  <WhpptButton text="use" onClick={() => use(item)} />
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
