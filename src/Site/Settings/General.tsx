import React, { FC } from 'react';
import { Heading } from '../../ui/components/Heading';
import { WhpptButton, WhpptTab } from '../../ui/components';
import { useWhppt } from '../../Context';

export const General: FC<WhpptTab> = () => {
  const { api, settingsData, nav, footer } = useWhppt();

  const publishSettings = () => {
    api.site.settings.publish({ settings: settingsData });
  };

  const publishNav = () => {
    api.site.settings.publishNav({ nav });
  };

  const publishFooter = () => {
    api.site.settings.publishFooter({ footer });
  };

  const saveNewSlug = () => {};

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <Heading text={'Publishing'} />

        <hr className="whppt-site-setings__ruler" />

        <div className="whppt-site-setings__actions">
          <WhpptButton text="Publish Site Settings" disabled={!settingsData} onClick={publishSettings} />
          <WhpptButton text="Publish Nav" disabled={!nav} onClick={publishNav} />
          <WhpptButton text="Publish Footer" disabled={!footer} onClick={publishFooter} />
        </div>
      </section>

      <section className="whppt-form-section">
        <Heading text={'Dependencies'} />

        <hr className="whppt-site-setings__ruler" />

        <WhpptButton text="Save New Slug" onClick={saveNewSlug} />
      </section>
    </form>
  );
};
