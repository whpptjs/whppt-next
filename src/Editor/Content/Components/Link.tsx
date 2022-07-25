import React from 'react';
import { FC } from 'react';
import { LinkEditor } from '../../Components';
import { ComponentData } from '../../../ui/Content';
import { WhpptLink, WhpptLinkData } from '../../../ui/components';
import { useWhppt } from '../../../Context';

export type LinkComponentData = ComponentData & {
  link: WhpptLinkData;
};

export const LinkComponent: FC<{ data: LinkComponentData; onChange: (data: ComponentData) => void }> = ({ data, onChange }) => {
  const _data = data;
  const { editing } = useWhppt();

  return (
    <div className={editing ? 'whppt-content--hovered' : ''} onClick={e => e.stopPropagation()}>
      <LinkEditor value={_data.link} onChange={link => onChange({ ...data, link } as ComponentData)}>
        <WhpptLink link={_data.link} editing={editing}>
          {_data.link.text || 'Link'}
        </WhpptLink>
      </LinkEditor>
    </div>
  );
};
