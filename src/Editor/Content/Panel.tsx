import React, { FC, useMemo } from 'react';
import orderBy from 'lodash/orderBy';
import { ComponentData } from '../../ContentComponents/ComponentData';
import { EditorArgs } from '../EditorArgs';
import { ContentEditorOptions } from './Editor';
import { nanoid } from 'nanoid';

export const WhpptContentEditorPanel: FC<EditorArgs<ComponentData[], ContentEditorOptions>> = ({ onChange, options, value }) => {
  const orderedComponents = useMemo(() => {
    return orderBy(options.componentDefinitions, d => d.name);
  }, [options.componentDefinitions]);

  return (
    <div>
      {orderedComponents.map(c => {
        if (!c.init) throw new Error(`Definition is missing a init funciton ${c.key}`);
        const inilizedData = c.init({});
        const componentData: ComponentData = {
          _id: nanoid(),
          definitionKey: c.key,
          data: inilizedData,
          container: options.containerDefault,
        };

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
