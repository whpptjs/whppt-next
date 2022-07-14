import React, { FC, useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { EditorOptions } from '../EditorOptions';
import { EditorArgs } from '../EditorArgs';
import { WhpptButton, WhpptIcon } from '../../ui/components';

// import './styles.css';

export type ListEditorOptions = EditorOptions & {
  addNew: () => any;
  displayName?: (item: any) => string;
};
export type SortableListItem = {
  _id: string;
  text: string;
};

export const WhpptListEditor: FC<EditorArgs<any[], ListEditorOptions>> = ({ value, onChange, options }) => {
  const listItems = useMemo(() => {
    return value.map((v, i) => ({ _id: v._id, text: options.displayName ? options.displayName(v) : `Item ${i}` } as SortableListItem));
  }, [options, value]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    onChange(arrayMoveImmutable(value, oldIndex, newIndex));
    var el = document.querySelector('li.whppt-sortable-list__item.sortableHelper');
    el && el.parentNode.removeChild(el);
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 0);
  }, []);
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
    <>
      <div className="whppt-contents__actions">
        <WhpptButton
          text={'Add To List'}
          icon="add"
          onClick={() => {
            const newItem = options.addNew();
            onChange([...value, { _id: nanoid(), ...newItem }]);
          }}></WhpptButton>
      </div>
      <div className={'whppt-sortable-list'}>
        <div className={show ? '' : 'whppt-sortable-list--hide'}>
          <SortableList distance={10} helperClass="sortableHelper" items={listItems} onSortEnd={onSortEnd} />
        </div>
      </div>
    </>
  );
};

// import React, { FC, useCallback } from 'react';
// import { nanoid } from 'nanoid';

// import { useDrag, useDrop } from 'react-dnd';
// // import { listItemStyle as style } from './style'

// import { EditorArgs } from '../EditorArgs';
// import { WhpptButton } from '../../ui/components';
// import { EditorOptions } from '../EditorOptions';

// export type ListEditorOptions = EditorOptions & {
//   addNew: () => any;
//   displayName?: (item: any) => string;
// };

// export const WhpptListEditor: FC<EditorArgs<any[], ListEditorOptions>> = ({ value, onChange, options }) => {
//   console.log('🚀 ~ file: Panel.tsx ~ line 15 ~ value', value);

//   return (
//     <div className="whppt-richtext-editor">
//       <div className="whppt-contents__actions">
//         <WhpptButton
//           text={'Add To List'}
//           icon="add"
//           onClick={() => {
//             const newItem = options.addNew();
//             onChange([...value, { id: nanoid(), ...newItem }]);
//           }}></WhpptButton>
//       </div>

//       {/* <ul>
//         {(value as any[]).map((item, index) => (
//           <li key={item._id}>{options.displayName ? options.displayName(item) : `Item ${index}`}</li>
//         ))}
//       </ul> */}
//     </div>
//   );
// };
