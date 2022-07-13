import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptButton, WhpptTab, WhpptCheckbox } from '../../ui/components';
import { useWhppt } from '../../Context';
import { formatSlug } from '../../helpers';

export const General: FC<WhpptTab> = () => {
  const { domain, api, page } = useWhppt();

  const [slug, setSlug] = useState('');
  const [slugError, setSlugError] = useState('');
  const [validSlug, setValidSlug] = useState('');

  const [hideFromXML, setHideFromXML] = useState(false);

  const saveSlug = () => {
    const formattedSlug = formatSlug(slug);
    api.page.checkSlug({ slug: formattedSlug, domain }).then((_page) => {
      _page ? setSlugError('Slug taken') : setValidSlug(formattedSlug);
    });
  };

  const duplicatePage = () => {
    const newPage = {
      slug: validSlug,
      domainId: domain._id,
      pageType: 'page',
    };

    api.page.create({ page: { ...newPage, _id: undefined } });
  };

  const deletePage = () => {
    api.page.delete(page);
  };

  const handleCheckBox = () => {
    setHideFromXML(!hideFromXML);
  };

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <div>
          <WhpptButton
            text="Duplicate Page"
            icon="duplicate"
            disabled={!validSlug}
            onClick={duplicatePage}
          />
        </div>
        <div>
          <WhpptButton text="Delete Page" icon="bin" onClick={deletePage} />
        </div>
      </section>
      <div className="whppt-form-page-settings__form">
        <section className="whppt-form-section whppt-form-section--bottom-gap">
          <WhpptInput
            id="whppt-plaintext-input"
            label="Page Slug"
            type="text"
            error={slugError}
            info={`Slug: ${formatSlug(slug)}`}
            value={slug}
            onChange={setSlug}
          />

          <WhpptButton
            text="Save New Slug"
            icon=""
            disabled={!slug}
            onClick={saveSlug}
          />
        </section>

        <section className="whppt-form-section">
          <WhpptCheckbox
            label={'HIDE THIS PAGE FROM THE SITEMAP XML?'}
            value={'hide-from-xml'}
            onChange={() => handleCheckBox()}
          />
        </section>
      </div>
    </form>
  );
};
