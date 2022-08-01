import React, { FC, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { EditorOptions } from '../EditorOptions';
import { EditorArgs } from '../EditorArgs';
import { WhpptButton, WhpptIcon } from '../../ui/components';

export type ListEditorOptions = EditorOptions & {
  addNew: () => any;
  displayName?: (item: any) => string;
};
export type SortableListItem = {
  _id: string;
  text: string;
};

export const WhpptListEditorPanel: FC<EditorArgs<any[], ListEditorOptions>> = ({ value, onChange, options }) => {
  const listItems = useMemo(() => {
    return value.map((v, i) => ({ _id: v._id, text: options.displayName ? options.displayName(v) : `Item ${i}` } as SortableListItem));
  }, [options, value]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    onChange(arrayMoveImmutable(value, oldIndex, newIndex));
    var el = document.querySelector('li.whppt-sortable-list__item.sortableHelper');
    el && el.parentNode.removeChild(el);
  };

  const SortableItem = SortableElement<{ item: SortableListItem }>(({ item }) => (
    <li className="whppt-sortable-list__item">
      <div className="whppt-sortable-list__item--flex">
        <div className="whppt-sortable-list__item--icon">
          <WhpptIcon is="order" />
        </div>
        {item.text}
      </div>
      <WhpptButton
        text={''}
        icon="bin"
        onClick={() => {
          onChange(value.filter(v => v._id !== item._id));
        }}></WhpptButton>
    </li>
  ));

  const SortableList = SortableContainer<{ items: SortableListItem[] }>(({ items }) => {
    return (
      <ul>
        {items.map((item, index) => (
          <SortableItem key={`item-${item._id}`} index={index} item={item} />
        ))}
      </ul>
    );
  });

  return (
    <div className={'whppt-sortable-list'}>
      <div className="whppt-sortable-list__main-actions">
        <div>Add new a new item to the list</div>
        <WhpptButton
          text={'Add'}
          icon="add"
          onClick={() => {
            const newItem = options.addNew();
            onChange([...value, { _id: nanoid(), ...newItem }]);
          }}></WhpptButton>
      </div>
      <SortableList distance={10} helperClass="sortableHelper" items={listItems} onSortEnd={onSortEnd} />
      <div className="whppt-sortable-list__helper">Drag items to change the order.</div>
    </div>
  );
};
