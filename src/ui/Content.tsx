import React, { FC, ReactElement } from 'react';
import { ContentEditor, EditorArgs, replaceInList, useWhppt } from '../index';
import { ComponentData, WhpptComponentDefinition } from '../ContentComponents/ComponentData';

export type ContentTreeNode = {
  name: string;
  value: ComponentData[];
  onChange: (value: ComponentData[]) => void;
};

export type WhpptContentArgs = EditorArgs<ComponentData[]> & {
  componentDefinitions: WhpptComponentDefinition[];
  renderComponent: (data: ComponentData, onChange: (data: ComponentData) => void) => ReactElement;
};

export const WhpptContent: FC<WhpptContentArgs> = ({ renderComponent, componentDefinitions, onChange, value }) => {
  const { editing } = useWhppt();
  return (
    <ContentEditor<ComponentData> value={value} componentDefinitions={componentDefinitions} onChange={onChange}>
      {
        <div className={editing ? 'whppt-content' : ''}>
          {value.map(content => {
            return <div key={content._id}>{renderComponent(content, changedValue => onChange(replaceInList(value, changedValue)))}</div>;
          })}
          {editing && <div>Add your new components</div>}
        </div>
      }
    </ContentEditor>
  );
};
