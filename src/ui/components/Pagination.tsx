import React, { FC, useMemo } from 'react';
import { WhpptSelect } from '.';
import { WhpptIcon } from './Icon';

type WhpptPagintionProps = {
  page: number;
  total: number;
  perPage: number;
  selectOptions: any[];
  changePage: (page: any) => any;
  setPerPage: (page: any) => any;
};

export const WhpptPagination: FC<WhpptPagintionProps> = ({ page, total, perPage, selectOptions, changePage, setPerPage }) => {
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

      <div className="whppt-pagination__select">
        <WhpptSelect
          items={selectOptions}
          onChange={option => setPerPage(option.value)}
          getOptionLabel={item => item.label}
          value={{ label: perPage }}
        />
      </div>
    </div>
  );
};
