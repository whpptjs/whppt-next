import React, { FC, ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';
import { trim } from 'lodash';
import { nanoid } from 'nanoid';
import { useWhppt } from '../../Context';

export type WhpptLinkData = {
  _id?: string;
  type: 'page' | 'external' | 'anchor' | 'file';
  text: string;
  href: string;
};

export const WhpptLinkData = {
  New(type: 'page' | 'external' | 'anchor' | 'file', text, href) {
    return { _id: nanoid(), type, text, href };
  },
};

export const WhpptLink: FC<{
  link: WhpptLinkData;
  className?: string;
  children?: ReactElement | ReactElement[] | string;
}> = ({ link, className, children }) => {
  const router = useRouter();
  const { editing } = useWhppt();

  const renderedHref = useMemo(() => {
    if (link.type === 'page' && !link.href.startsWith('/')) return `/${link.href}`;
    return link.href;
  }, [link]);

  const linkHref = trim(link.href, '/');
  const pathname = trim(router.pathname, '/');
  if (!renderedHref) return <div> {children ? children : <div>{link.text}</div>}</div>;

  return (
    <a
      href={renderedHref}
      onClick={editing ? e => e.preventDefault() : undefined}
      target={link.type === 'external' ? '_blank' : ''}
      className={[
        router.pathname == link.href ? 'exact-active' : '',
        linkHref.startsWith(pathname) && pathname !== '' ? 'active' : '',
        className || '',
      ].join(' ')}
      rel="noreferrer">
      {children ? children : <div>{link.text}</div>}
    </a>
  );
};
