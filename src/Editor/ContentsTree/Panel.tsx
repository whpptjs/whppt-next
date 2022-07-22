import React, { FC, useEffect, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { ComponentData } from '../../..';
import { useWhppt } from '../../Context';

export const WhpptContentsTreeEditor: FC = () => {
  const { contentTree, page } = useWhppt();
  const tree = useMemo(() => {
    return contentTree && contentTree.getTree ? contentTree.getTree(page) : [];
  }, [contentTree, page]);

  useEffect(() => {
    console.log('🚀 ~ file: Panel.tsx ~ line 13 ~ tree', tree);
  }, [tree]);

  const SortableItem = SortableElement<{ item: ComponentData }>(({ item, index }) => (
    <div className="whppt-content-tree-list__inner-list" key={`whppt-contents-child-${index}`}>
      {item.definitionKey}
    </div>
  ));

  const onSortEnd = () => {
    // const onSortEnd = ({ oldIndex, newIndex }) => {
    // onChange(arrayMoveImmutable(value, oldIndex, newIndex));
    // var el = document.querySelector('li.whppt-sortable-list__item.sortableHelper');
    // el && el.parentNode.removeChild(el);
  };

  const SortableList = SortableContainer<{ items: ComponentData[][] }>(({ items }) => {
    return (
      <ul>
        {items.map((list, key) => (
          <div className="whppt-content-tree-list" key={`whppt-contents-${key}`}>
            {list.map((content, index) => {
              return <SortableItem key={`whppt-contents-${key}`} index={index} item={content} />;
            })}
          </div>
        ))}
      </ul>
    );
  });

  return (
    <div>
      <SortableList distance={10} helperClass="sortableHelper" items={tree} onSortEnd={onSortEnd} />

      {/* {tree.map((contents, key) => {
        return (
          <div className="whppt-content-tree-list" key={`whppt-contents-${key}`}>
            {contents.map((content, index) => {
              return (
                <div className="whppt-content-tree-list__inner-list" key={`whppt-contents-child-${index}`}>
                  {content.definitionKey}
                </div>
              );
            })}
          </div>
        );
      })} */}
    </div>
  );
};
