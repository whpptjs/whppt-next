import React, { useMemo } from 'react';
import Head from 'next/head';
import { useWhppt } from '../Context';
import htmlToText from 'html-to-text';
import { format } from 'date-fns';
import { buildCroppedImgUrl } from '../Editor';

export const Meta = () => {
  const { page, settingsData } = useWhppt();

  const twitter = useMemo(() => {
    return {
      title: page?.settings?.twitter?.title || settingsData?.twitter?.title,
      description: page?.settings?.twitter?.description || settingsData?.twitter?.description,
      keywords: page?.settings?.twitter?.keywords || settingsData?.twitter?.keywords,
    };
  }, [page?.settings?.twitter, settingsData?.twitter]);

  const seo = useMemo(() => {
    return {
      title: page?.settings?.seo?.title || settingsData?.seo?.title,
      description: page?.settings?.seo?.description || settingsData?.seo?.description,
      keywords: page?.settings?.seo?.keywords || settingsData?.seo?.keywords,
    };
  }, [page?.settings?.seo, settingsData?.seo]);

  const og = useMemo(() => {
    return {
      title: page?.settings?.og?.title || settingsData?.og?.title,
      description: page?.settings?.og?.description || settingsData?.og?.description,
      keywords: page?.settings?.og?.keywords || settingsData?.og?.keywords,
    };
  }, [page?.settings?.og, settingsData?.og]);

  const title = useMemo(() => {
    return (
      seo?.title ||
      og?.title ||
      twitter?.title ||
      htmlToText.fromString(page?.header?.content?.title || '', {
        wordWrap: false,
      })
    );
  }, [page?.header?.content?.title, seo?.title, og?.title, twitter?.title]);

  const image = useMemo(() => {
    if (!page?.header?.content?.image?.desktop) return '';
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
