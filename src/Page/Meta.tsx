import React, { useMemo } from 'react';
import Head from 'next/head';
import { useWhppt } from '../Context';
import htmlToText from 'html-to-text';
import { format } from 'date-fns';
import { buildCroppedImgUrl } from '../Editor';

export const Meta = () => {
  const { page } = useWhppt();

  const title = useMemo(() => {
    return htmlToText.fromString(page?.header?.content?.title || '', {
      wordWrap: false,
    });
  }, [page?.header?.content?.title]);

  const twitter = useMemo(() => {
    return page?.settings?.twitter;
  }, [page?.settings?.twitter]);

  const seo = useMemo(() => {
    return page?.settings?.seo;
  }, [page?.settings?.seo]);

  const og = useMemo(() => {
    return page?.settings?.og;
  }, [page?.settings?.og]);

  const image = useMemo(() => {
    return buildCroppedImgUrl(page?.header?.content?.image?.desktop, {
      width: undefined,
      height: undefined,
      scale: 1,
    });
  }, [page?.header?.content?.image]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={seo?.description} />
      <meta name="keywords" content={`${seo?.keywords}`} />
      <meta property="og:title" content={og?.title} />
      <meta property="og:description" content={og?.description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:type"
        content={
          page.lastPublished
            ? `${format(new Date(page.lastPublished), 'yyyy-MM-dd')}T${format(new Date(page.lastPublished), 'HH:mm:sszzz')}`
            : ''
        }
      />
      <meta property="og:image" content={image} />
      <meta property="twitter:title" content={twitter?.title} />
      <meta property="twitter:description" content={twitter?.description} />
      <meta property="twitter:type" content="website" />
      <meta
        property="twitter:type"
        content={
          page.lastPublished
            ? `${format(new Date(page.lastPublished), 'yyyy-MM-dd')}T${format(new Date(page.lastPublished), 'HH:mm:sszzz')}`
            : ''
        }
      />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};
