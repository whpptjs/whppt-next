import React, { FC } from 'react';
import { WhpptHeading } from '../../ui/components/Heading';
import { WhpptButton, WhpptInput, WhpptTab, WhpptTextArea } from '../../ui/components';
import { useWhppt } from '../../Context';
import { toast } from 'react-toastify';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

export const General: FC<WhpptTab> = () => {
  const { api, settingsData, setSettingsData, nav, footer, domain } = useWhppt();

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
  const publishGallery = () => {
    const publish = api.gallery.publishGallery(domain._id);

    toast.promise(publish, {
      pending: 'Publishing Site Gallery...',
      success: 'Site Gallery published',
      error: 'Publishing Gallery failed 🤯',
    });
  };

  const saveNewSlug = () => {};

  const saveCookiePopup = ({ title, message }) => {
    const settings = { ...settingsData, cookiePopUp: { title, message, _id: nanoid() } };
    const save = api.site.settings.save({ settings, domain }).then(() => {
      setSettingsData(settingsData);
    });

    toast.promise(save, {
      pending: 'Saving Cookie Popup...',
      success: 'Cookie Popup Saved',
      error: 'Saving Cookie Popup failed 🤯',
    });
  };

  return (
    <form className="whppt-form whppt-site-settings">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptHeading text={'Publishing'} />

        <hr className="whppt-site-setings__ruler" />

        <div className="whppt-site-setings__actions">
          <WhpptButton text="Publish Site Settings" disabled={!settingsData} onClick={publishSettings} />
          <WhpptButton text="Publish Nav" disabled={!nav} onClick={publishNav} />
          <WhpptButton text="Publish Footer" disabled={!footer} onClick={publishFooter} />
          <WhpptButton text="Publish Gallery" onClick={publishGallery} />
        </div>
      </section>

      <section className="whppt-form-section">
        <WhpptHeading text={'Dependencies'} />

        <hr className="whppt-site-setings__ruler" />

        <WhpptButton text="Save New Slug" onClick={saveNewSlug} />
      </section>

      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptHeading text={'Cookie Agreement Popup'} />

        <hr className="whppt-site-setings__ruler" />
        {
          <Formik
            initialValues={{ title: settingsData?.cookiePopUp?.title || '', message: settingsData?.cookiePopUp?.message || '' }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={saveCookiePopup}>
            {({ handleSubmit, touched, values, errors, setFieldValue }) => (
              <>
                <Field
                  as={WhpptInput}
                  id="whppt-plaintext-input"
                  label="Popup titile"
                  type="text"
                  error={(touched.title && errors.title) || ''}
                  value={values.title}
                  placeholder="Example: About cookies on this site"
                  onChange={(title: string) => setFieldValue('title', title)}
                />
                <Field
                  as={WhpptTextArea}
                  id="whppt-plaintext-input"
                  label="Agreement text"
                  error={(touched.message && errors.message) || ''}
                  value={values.message}
                  placeholder="Example: This website uses cookies to ensure you get the best experience on our website."
                  onChange={(message: string) => setFieldValue('message', message)}
                />
                <WhpptButton text="Save Title and Message" onClick={handleSubmit} />
              </>
            )}
          </Formik>
        }
      </section>
    </form>
  );
};
