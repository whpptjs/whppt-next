import slugify from 'slugify';
import React, { FC, useState } from 'react';
import { Formik } from 'formik';

import { WhpptButton, WhpptInput } from '../../ui/components';
import { useWhppt } from '../../Context';

export const WhpptNewPageEditor: FC = () => {
  const { api, domain } = useWhppt();

  const [page] = useState({
    slug: '',
  });
  const [error, setError] = useState('');

  const formatSlug = (slug) => {
    if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

    slug = slug.replace(/\/{2,}/g, '/');

    slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
    slug = slug.replace(/[#?]/g, '');

    return slug;
  };

  const createPage = (values) => {
    const page = {
      ...values,
      slug: formatSlug(values.slug),
      domainId: domain._id,
      pageType: 'page',
    };
    return api.page.checkSlug({ slug: page.slug, domain }).then((_page) => {
      if (_page) return setError('Slug Taken');
      return api.page.create({ page }).then((createdPage) => {});
    });
    // .catch(() => {
    //   setError(true);
    // });
  };

  return (
    <div className="">
      <Formik
        initialValues={page}
        validate={(values) => {
          const errors = {} as any;
          if (!values.slug) {
            errors.slug = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          createPage(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <WhpptInput
              id={'new_page_slug'}
              label={'Slug*'}
              info={`Slug: ${formatSlug(props.values.slug)}`}
              type={'text'}
              name={'slug'}
              value={props.values.slug}
              onChangeEvent={props.handleChange}
              error={props.errors.slug}
            />
            <div className="">
              <WhpptButton
                text={'Create'}
                type="submit"
                onClick={() => props.handleSubmit}
              />
            </div>
            <div className="whppt-error">{error}</div>
          </form>
        )}
      </Formik>
    </div>
  );
};
