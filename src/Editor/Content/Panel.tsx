import React, { FC } from 'react';
import { ComponentData } from '../../ContentComponents/ComponentData';
import { EditorArgs } from '../EditorArgs';
import { ContentEditorOptions } from './Editor';
import { nanoid } from 'nanoid';

export const WhpptContentEditorPanel: FC<EditorArgs<ComponentData[], ContentEditorOptions>> = ({ onChange, options, value }) => {
  return (
    <div>
      {options.componentDefinitions.map(c => {
        if (!c.init) throw new Error(`Definition is missing a init funciton ${c.key}`);
        const inilizedData = c.init({});
        const componentData: ComponentData = { _id: nanoid(), definitionKey: c.key, data: inilizedData };

        return (
          <div key={c.key}>
            <button className="whppt-content__item" onClick={() => onChange([...value, componentData])}>
              {c.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};
