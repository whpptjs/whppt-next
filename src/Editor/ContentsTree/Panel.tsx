import React, { FC } from 'react';
import { useWhppt } from '../../Context';

export const WhpptContentsTreeEditor: FC = () => {
  const { contentsTree } = useWhppt();
  console.log('🚀 ~ file: Panel.tsx ~ line 6 ~ contentsTree', contentsTree);

  const x = contentsTree();
  console.log('🚀 ~ file: Panel.tsx ~ line 8 ~ x', x);
  return <div>test</div>;
};
