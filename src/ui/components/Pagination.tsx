import React, { FC, useMemo } from 'react';
import { WhpptIcon } from './Icon';
// import { WhpptSelect } from './Select';

type WhpptPagintionProps = {
  page: number;
  total: number;
  perPage: number;
  perPageItems: any[];
  changePage: (page: any) => any;
  setPerPage: (page: any) => any;
};

export const WhpptPagination: FC<WhpptPagintionProps> = ({ page, total, perPage, changePage }) => {
  const firstNumber = page * perPage - perPage + 1;
  const secondNumber = total < page * perPage ? total : page * perPage;
  const shownItems = `${firstNumber} - ${secondNumber}`;

  const handleClick = newPage => {
    changePage(newPage);
  };

  const canIncreasePage = useMemo(() => page * perPage <= total, [page, perPage, total]);

  return (
    <div className={`whppt-pagination `}>
      <div className="whppt-pagination__results">{total ? `${shownItems} of ${total}` : `showing results ${shownItems}`}</div>

      <div className="whppt-pagination__buttons">
        <button type="button" disabled={page <= 1} onClick={() => handleClick(page - 1)}>
          <WhpptIcon is="previous"></WhpptIcon>
        </button>
        <button type="button" disabled={!canIncreasePage} onClick={() => handleClick(page + 1)}>
          <WhpptIcon is="next"></WhpptIcon>
        </button>
      </div>
    </div>
  );
};
