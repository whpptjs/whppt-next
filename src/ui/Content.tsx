import React, { FC, ReactElement, useEffect } from 'react';
import { isEqual } from 'lodash';
import { ContentEditor, EditorArgs, replaceInList, useWhppt } from '../index';

export type WhpptComponentDefinition = {
  key: string;
  name: string;
  componentType: string;
  init: (value: ComponentData) => ComponentData;
};

export type ComponentData = {
  _id: string;
  definitionKey: string;
};

export type WhpptContentArgs = EditorArgs<ComponentData[]> & {
  componentDefinitions: WhpptComponentDefinition[];
  renderComponent: (data: ComponentData, onChange: (data: ComponentData) => void) => ReactElement;
};

export const WhpptContent: FC<WhpptContentArgs> = ({ renderComponent, componentDefinitions, onChange, value }) => {
  const { editing } = useWhppt();

  useEffect(() => {
    return value.forEach(v => {
      const definition = componentDefinitions.find(def => def.key === v.definitionKey);
      if (!definition || !definition.init) return v;
      const initalizedValue = definition.init(v);
      if (!isEqual(v, initalizedValue)) return onChange(replaceInList(value, initalizedValue));
    });
  }, [value, componentDefinitions, onChange]);

  return (
    <ContentEditor<ComponentData> value={value} componentDefinitions={componentDefinitions} onChange={onChange}>
      {
        <div className={editing ? 'whppt-content' : ''}>
          {value.map(data => {
            return <div key={data._id}>{renderComponent(data, changedValue => onChange(replaceInList(value, changedValue)))}</div>;
          })}
          {editing && <div>Add your new components</div>}
        </div>
      }
    </ContentEditor>
  );
};
