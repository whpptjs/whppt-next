import React, { FC, useEffect, useState } from 'react';
import { useWhppt } from '../../Context';
import { ConfirmationPopup, WhpptButton } from '../../ui/components';

type Prompt = {
  close: () => void;
  remove: () => void;
  itemId: string;
};

type Dependency = {
  _id: string;
  parentId: string;
  slug: string;
  type: string;
  galleryItemId: string;
};

export const Prompt: FC<Prompt> = ({ close, itemId, remove }) => {
  const { api, page } = useWhppt();

  const [loadingDependencies, setLoadingDependencies] = useState(false);
  const [dependency, setDependency] = useState<Dependency>();

  useEffect(() => {
    setLoadingDependencies(true);
    if (itemId && page?._id) {
      api.gallery
        .findDependency(itemId, page._id)
        .then(setDependency)
        .finally(() => setLoadingDependencies(false));
    }
  }, [itemId, page._id]);

  return (
    <ConfirmationPopup header={'Delte Item'} close={close}>
      {loadingDependencies ? (
        <div className="whppt-gallery__loader">
          <div className="whppt-gallery__loader__spinner"></div>
        </div>
      ) : (
        <div>
          {dependency ? (
            <>
              <p className="whppt-confirmation-popup-content__children--message">
                This image is currently being used on the page {dependency.slug} and can not be deleted.
              </p>
              <button onClick={close}>close</button>
            </>
          ) : (
            <>
              <p className="whppt-confirmation-popup-content__children--message">Are you sure you want to remove this image?</p>
              <div className="whppt-confirmation-popup-content__children--actions">
                <button onClick={close}>close</button>
                <WhpptButton text="Delete" onClick={remove} />
              </div>
            </>
          )}
        </div>
      )}
    </ConfirmationPopup>
  );
};
