import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptButton, WhpptTab, WhpptCheckbox } from '../../ui/components';
import { useWhppt } from '../../Context';
import { formatSlug } from '../../helpers';
import { toast } from 'react-toastify';
import { SavePagePopup } from '../../ui/Popups/SavePage';

export const General: FC<WhpptTab> = () => {
  const { domain, api, page, setPage } = useWhppt();
  const [slug, setSlug] = useState('');
  const [slugError, setSlugError] = useState('');
  const [validSlug, setValidSlug] = useState('');
  const [confirmationPopup, setConfirmationPopup] = useState('');

  const saveSlug = () => {
    const formattedSlug = formatSlug(slug);
    const slugCheck = api.page.checkSlug({ slug: formattedSlug, domain }).then(_page => {
      _page ? setSlugError('Slug taken') : setValidSlug(formattedSlug);
    });

    toast.promise(slugCheck, {
      pending: 'Checking slug...',
      success: 'Slug saved',
      error: 'Slug asve failed 🤯',
    });
  };

  const duplicatePage = () => {
    const newPage = {
      slug: validSlug,
      domainId: domain._id,
      pageType: 'page',
    };

    const pageDulpicate = api.page.save({ page: { ...newPage, _id: undefined } });

    toast.promise(pageDulpicate, {
      pending: 'Duplicating page...',
      success: 'Page Duplicated',
      error: 'Page duplicate failed 🤯',
    });
  };

  const deletePage = () => {
    const pageDelete = api.page.delete(page);

    toast.promise(pageDelete, {
      pending: 'Deleting Page...',
      success: 'Page deleted',
      error: 'Page delete failed 🤯',
    });
  };

  return (
    <form className="whppt-form">
      <section className="whppt-form__actions">
        {confirmationPopup === 'page' && <SavePagePopup callback={() => setConfirmationPopup('')} />}

        <div>
          <WhpptButton text="Save Settings" icon="save" onClick={() => setConfirmationPopup('page')} />
        </div>
        <div>
          <WhpptButton text="Duplicate Page" icon="duplicate" disabled={!validSlug} onClick={duplicatePage} />
        </div>
        <div>
          <WhpptButton text="Delete Page" icon="bin" onClick={deletePage} />
        </div>
      </section>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          <WhpptCheckbox
            label={'HIDE THIS PAGE FROM THE SITEMAP XML?'}
            value={`${page.settings.hideFromSitemap}`}
            onChange={() => setPage({ ...page, settings: { ...page.settings, hideFromSitemap: !page.settings.hideFromSitemap } })}
          />
        </section>
        <section className="whppt-form-section">
          <h4 className="whppt-form__content--header">Slug Details</h4>
          <WhpptInput
            id="whppt-plaintext-input"
            label="Page Slug"
            type="text"
            error={slugError}
            info={`Slug: ${formatSlug(slug)}`}
            value={slug || page.slug}
            onChange={setSlug}
          />
          <WhpptButton text="Save New Slug" icon="" disabled={!slug} onClick={saveSlug} />
        </section>
      </div>
    </form>
  );
};
