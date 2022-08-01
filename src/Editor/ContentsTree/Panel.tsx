import React, { FC, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { ComponentData, WhpptIcon } from '../../index';
import { useWhppt } from '../../Context';

export const WhpptContentsTreeEditorPanel: FC = () => {
  const { contentTree, page } = useWhppt();
  const tree = useMemo(() => {
    return contentTree && contentTree.getTree ? contentTree.getTree(page) : [];
  }, [contentTree, page]);

  const SortableItem = SortableElement<{ item: ComponentData }>(({ item }) => (
    <li className="whppt-content-tree-list__inner-list">
      <WhpptIcon is="order" />
      {item.definitionKey}
    </li>
  ));

  const onSortEnd = ({ oldIndex, newIndex }, treeNode) => {
    treeNode.onChange(arrayMoveImmutable(treeNode.value, oldIndex, newIndex));
    var el = document.querySelector('li.whppt-content-tree-list__inner-list.sortableHelper');
    el && el.parentNode.removeChild(el);
  };

  const SortableList = SortableContainer<{ items: ComponentData[] }>(({ items }) => {
    return (
      <ul>
        {items.map((content, index) => {
          return <SortableItem key={`whppt-contents-${index}`} index={index} item={content} />;
        })}
      </ul>
    );
  });

  return (
    <div>
      {tree.map((treeNode, key) => (
        <ul className="whppt-content-tree-list" key={`whppt-contents-${key}`}>
          <div>{treeNode.name}</div>
          <SortableList distance={10} helperClass="sortableHelper" items={treeNode.value} onSortEnd={args => onSortEnd(args, treeNode)} />
        </ul>
      ))}
    </div>
  );
};
