import * as React from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from './use-raised-shadow';

interface Props {
  item: string;
}

export const ListItem = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={item} style={{ boxShadow, y }}>
      <div className="whppt-tag-filter__list-item">{item}</div>
    </Reorder.Item>
  );
};
