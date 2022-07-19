import { nanoid } from 'nanoid';
import React, { FC } from 'react';
import { ComponentData } from 'src/ui/Content';
import { EditorArgs } from '../EditorArgs';
import { ContentEditorOptions } from './Editor';

export const WhpptContentEditor: FC<EditorArgs<ComponentData[], ContentEditorOptions>> = ({ onChange, options, value }) => {
  return (
    <div>
      {options.componentDefinitions.map(c => {
        if (!c.init) throw new Error(`Definition is missing a init funciton ${c.key}`);
        const inilizedData = c.init({ _id: nanoid(), definitionKey: c.key } as ComponentData);

        return (
          <div key={c.key} onClick={() => onChange([...value, inilizedData])}>
            {c.name}
          </div>
        );
      })}
    </div>
  );
};
