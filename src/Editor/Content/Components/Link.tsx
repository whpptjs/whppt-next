import React from 'react';
import { FC } from 'react';
import { LinkEditor } from '../../Components';
import { ComponentData } from '../../../ui/Content';
import { WhpptLink, WhpptLinkData } from '../../../ui/components';

export type LinkPageComponentData = ComponentData & {
  link: WhpptLinkData;
};

export const LinkComponent: FC<{ data: LinkPageComponentData; onChange: (data: ComponentData) => void }> = ({ data, onChange }) => {
  const _data = data;

  return (
    <div onClick={e => e.stopPropagation()}>
      <LinkEditor value={_data.link} onChange={link => onChange({ ...data, link } as ComponentData)}>
        {({ isEditing }) => (
          <WhpptLink link={_data.link} editing={isEditing}>
            {_data.link.text || 'Link'}
          </WhpptLink>
        )}
      </LinkEditor>
    </div>
  );
};
