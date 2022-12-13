import * as React from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from './use-raised-shadow';
import { WhpptIconOrder } from '../../icons/Order';
import { WhpptIconClose } from '../../icons/Close';
import { Dispatch } from 'react';

interface Props {
  item: string;
  selectedPages: [];
  setSelectedPages: Dispatch<React.SetStateAction<Array<string>>>;
}

export const ListItem = ({ item, setSelectedPages, selectedPages }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={item} style={{ boxShadow, y }}>
      <div className="whppt-tag-filter__list-item">
        <span className="whppt-tag-filter__list-item--order">
          <WhpptIconOrder />
        </span>
        <span>{item}</span>
        <span className="whppt-tag-filter__list-item--close" onClick={() => setSelectedPages(selectedPages.filter(page => page !== item))}>
          <WhpptIconClose />
        </span>
      </div>
    </Reorder.Item>
  );
};
