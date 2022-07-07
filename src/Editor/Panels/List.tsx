import React, { FC } from 'react';
import { nanoid } from 'nanoid';

import { WhpptEditorArgs } from '../EditorArgs';
import { WhpptButton } from '../../ui/components';

export type ListEditorOptions = {
  addNew: () => any;
  displayName?: (item: any) => string;
};

export const WhpptListEditor: FC<WhpptEditorArgs> = ({
  value,
  onChange,
  options,
}) => {
  const typedOptions = options as ListEditorOptions;

  return (
    <div className="whppt-richtext-editor">
      <div className="whppt-contents__actions">
        <WhpptButton
          text={'Add To List'}
          icon="add"
          onClick={() => {
            const newItem = typedOptions.addNew();
            onChange([...value, { _id: nanoid(), ...newItem }]);
          }}
        ></WhpptButton>
      </div>
      <ul>
        {(value as any[]).map((item, index) => (
          <li key={item._id}>
            {options.displayName ? options.displayName(item) : `Item ${index}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
{
  /* <div v-for="(item, index) in selectedComponent.value[selectedComponent.property]" :key="index">
  <div class="whppt-contents__item-container">
    <span>
      {{
        typeof item !== 'object' ? item || `Item #${index + 1}` : item.name || item.title || `Item #${index + 1}`
      }}
    </span>
    <div class="whppt-contents__actions">
      <whppt-button @click="moveUp(item, index)"><arrow-up /></whppt-button>
      <whppt-button @click="moveDown(item, index)"><arrow-down /></whppt-button>
      <whppt-button danger @click="removeItem(item)"><trash /></whppt-button>
    </div>
  </div>
</div> */
}
