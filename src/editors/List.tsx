import React, { FC } from 'react';
import { WhpptEditorArgs } from '..';
import { WhpptButton } from '../ui/components';

export const WhpptListEditor: FC<WhpptEditorArgs> = ({
  value,
  onChange,
  initalValue,
}) => {
  console.log('🚀 ~ file: List.tsx ~ line 10 ~ initalValue', initalValue);
  return (
    <div className="whppt-richtext-editor">
      <div className="whppt-contents__actions">
        <WhpptButton
          text={'Add To List'}
          icon="add"
          onClick={() => onChange([...value, { ...initalValue }])}
        ></WhpptButton>
      </div>
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
