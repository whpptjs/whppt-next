import React, { FC, useState } from 'react';
import { WhpptInput } from '../../ui/components/Input';
import { WhpptButton, WhpptTab, WhpptCheckbox } from '../../ui/components';
import { useWhppt } from '../../Context';
import { formatSlug } from '../../helpers';

export const General: FC<WhpptTab> = () => {
  const { domain } = useWhppt();

  const [slug, setSlug] = useState('');
  const [hideFromXML, setHideFromXML] = useState(false);

  const submit = () => {
    if (!slug) console.log('toast Missing Field: Slug');

    if (!(domain && domain._id)) console.log('toast No domain found');

    const newPage = {
      slug: formatSlug(slug),
      domainId: domain._id,
      template: "generic"
    }

    console.log(newPage)
  };

  const duplicatePage = () => {};

  const deletePage = () => {};


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
            error=""
            info="Please enter a value"
            value={slug}
            onChange={setSlug}
          />

          <WhpptButton text="Save New Slug" icon="" onClick={() => {}} />
        </section>

        <section className="whppt-form-section">
          <WhpptCheckbox
              dark={false}
              label={"HIDE THIS PAGE FROM THE SITEMAP XML?"}
              value={"hide-from-xml"}
              onChange={() => handleCheckBox()}
          />
        </section>
      </div>
    </form>
  );
};
