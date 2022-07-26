import React, { FC } from 'react';
import { Heading } from '../../ui/components/Heading';
import { WhpptButton, WhpptTab } from '../../ui/components';
import { useWhppt } from '../../Context';
import { toast } from 'react-toastify';

export const General: FC<WhpptTab> = () => {
  const { api, settingsData, nav, footer } = useWhppt();

  const publishSettings = () => {
    const publish = api.site.settings.publish({ settings: settingsData });

    toast.promise(publish, {
      pending: 'Publishing Site settings...',
      success: 'Site settings published',
      error: 'Publishing Site settings failed 🤯',
    });
  };

  const publishNav = () => {
    const publish = api.site.settings.publishNav({ nav });

    toast.promise(publish, {
      pending: 'Publishing Site Nav...',
      success: 'Site Nav published',
      error: 'Publishing Nav failed 🤯',
    });
  };

  const publishFooter = () => {
    const publish = api.site.settings.publishFooter({ footer });

    toast.promise(publish, {
      pending: 'Publishing Site Footer...',
      success: 'Site Footer published',
      error: 'Publishing Footer failed 🤯',
    });
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
