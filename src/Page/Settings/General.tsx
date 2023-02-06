import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptButton, WhpptTab, WhpptCheckbox, WhpptSelect } from '../../ui/components';
import { useWhppt } from '../../Context';
import { formatSlug } from '../../helpers';
import { toast } from 'react-toastify';
import { SavePagePopup } from '../../ui/Popups/SavePage';
import { PageData } from '../Model/Page';
import { useRouter } from 'next/router';
import { delay } from 'lodash';

export const General: FC<WhpptTab> = () => {
  const { domain, api, page, setPage, themes = [] } = useWhppt();
  const [slug, setSlug] = useState('');
  const [slugError, setSlugError] = useState('');
  const [validSlug, setValidSlug] = useState('');
  const [confirmationPopup, setConfirmationPopup] = useState('');

  const router = useRouter();

  const saveSlug = () => {
    const formattedSlug = formatSlug(slug);
    const slugCheck = api.page.checkSlug({ slug: formattedSlug, domain }).then(_page => {
      if (_page) {
        setSlugError('Slug taken');
        throw new Error('Slug taken');
      }
      setValidSlug(formattedSlug);
      setPage({ ...page, slug });
      setConfirmationPopup('page');
    });

    toast.promise(slugCheck, {
      pending: 'Checking slug...',
      success: 'Slug Available',
      error: 'Slug Not Available 🤯',
    });
  };

  const duplicatePage = () => {
    const newPage: PageData = {
      ...page,
      _id: undefined,
      slug: validSlug,
      domainId: domain._id,
    };

    const pageDulpicatePromise = api.page.save({ page: newPage });

    toast.promise(pageDulpicatePromise, {
      pending: 'Duplicating page...',
      success: 'Page Duplicated',
      error: 'Page duplicate failed 🤯',
    });
  };

  const deletePage = () => {
    const pageDeletePromise = api.page.delete(page);

    toast
      .promise(pageDeletePromise, {
        pending: 'Deleting Page...',
        success: 'Page deleted',
        error: 'Page delete failed 🤯',
      })
      .then(() => {
        delay(
          () =>
            router.push('/').then(() => {
              router.reload();
            }),
          2000
        );
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
          <WhpptButton text="Delete Page" disabled={page.published} icon="bin" onClick={deletePage} />
          {page.published ? <p className="whppt-form__actions-message">You need to unpublish the page before deleting</p> : <></>}
        </div>
      </section>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          {themes.length && (
            <WhpptSelect
              id="whppt-page-bg-picker"
              label="Base Colour of the background"
              items={themes}
              value={themes.find(i => page.theme && i.value === page.theme.value)}
              onChange={theme => setPage({ ...page, theme })}
              getOptionLabel={item => item.label}
            />
          )}
          <WhpptCheckbox
            label={'HIDE THIS PAGE FROM THE SITEMAP XML?'}
            value={page.settings.hideFromSitemap}
            onChange={val => setPage({ ...page, settings: { ...page.settings, hideFromSitemap: val } })}
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
        <section className="whppt-form-section">
          <h4 className="whppt-form__content--header">Card Description</h4>
          <WhpptInput
            id="whppt-plaintext-input-cardDescription"
            label="Card Description"
            type="text"
            error={slugError}
            info={`A short description for cards to advertise the page.`}
            value={page.cardDescription || ''}
            onChange={cardDescription => setPage({ ...page, cardDescription })}
          />
        </section>
      </div>
    </form>
  );
};
