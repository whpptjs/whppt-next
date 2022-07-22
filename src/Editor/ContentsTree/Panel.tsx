import React, { FC, useEffect, useMemo } from 'react';
import { useWhppt } from '../../Context';

export const WhpptContentsTreeEditor: FC = () => {
  const { contentTree, page } = useWhppt();
  const tree = useMemo(() => {
    return contentTree && contentTree.getTree ? contentTree.getTree(page) : [];
  }, [contentTree, page]);

  useEffect(() => {
    console.log('🚀 ~ file: Panel.tsx ~ line 13 ~ tree', tree);
  }, [tree]);
  return <div>test</div>;
};
