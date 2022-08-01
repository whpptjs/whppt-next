import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { WhpptButton, WhpptInput } from '../../ui/components';
import { useWhppt } from '../../Context';
import { formatSlug } from '../../helpers';

export const WhpptNewPageEditorPanel: FC = () => {
  const { api, domain } = useWhppt();

  const [page] = useState({
    slug: '',
  });

  const [error, setError] = useState('');

  const createPage = values => {
    const page = {
      ...values,
      slug: formatSlug(values.slug),
      domainId: domain._id,
      pageType: 'page',
    };
    return api.page.checkSlug({ slug: page.slug, domain }).then(_page => {
      if (_page) return setError('Slug Taken');
      return api.page.save({ page }).then(createdPage => {
        console.log('🚀 ~ file: NewPage.tsx ~ line 39 ~ returnapi.page.create ~ createdPage', createdPage);
        // router.push(createdPage.slug)
      });
    });
    // .catch(() => {
    //   setError(true);
    // });
  };

  return (
    <div className="">
      <Formik
        initialValues={page}
        validate={values => {
          const errors = {} as any;
          if (!values.slug) {
            errors.slug = 'Required';
          }
          return errors;
        }}
        onSubmit={values => {
          createPage(values);
        }}>
        {({ handleSubmit, values, errors, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <WhpptInput
              id={'new_page_slug'}
              label={'Slug*'}
              info={`Slug: ${formatSlug(values.slug)}`}
              type={'text'}
              name={'slug'}
              value={values.slug}
              onChangeEvent={handleChange}
              error={errors.slug}
            />
            <div className="">
              <WhpptButton text={'Create'} type="submit" onClick={() => handleSubmit} />
            </div>
            <div className="whppt-error">{error}</div>
          </form>
        )}
      </Formik>
    </div>
  );
};
