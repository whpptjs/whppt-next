import React, { FC } from 'react';
import { WhpptIcon } from './Icon';

type WhpptPagintionProps = {
  page: number
  total: number
  perPage: number
  perPageItems: any[]
  dark: boolean
  direction: 'up' | 'down'
}

export const WhpptPagination: FC<WhpptPagintionProps> = ({
  page,
  total,
  perPage,
  perPageItems,
  dark,
  direction
}) => {

  const firstNumber = page * perPage - perPage + 1;
  const secondNumber = total < page * perPage ? total : page * perPage;
  const shownItems = `${firstNumber} - ${secondNumber}`;

  return (
    <div className={`whppt-pagination ${dark ? 'whppt-pagination--dark' : ''}`}>
      <div className="whppt-pagination__per-page">
        <div className="whppt-pagination__per-page-select">
          select {perPage} {perPageItems} {direction}
        </div>
      </div>

      <div className="whppt-pagination__results">
        {total ? `${shownItems} of ${total}` : `showing results ${shownItems}`}
      </div>

      <div className="whppt-pagination__buttons">
        <button className="">
          <WhpptIcon is="previous"></WhpptIcon>
        </button>
        <button className="">
          <WhpptIcon is="next"></WhpptIcon>
        </button>
      </div>
    </div>
  )
}
