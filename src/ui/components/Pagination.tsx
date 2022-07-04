import React, { FC } from 'react';
import { WhpptIcon } from './Icon';
import { WhpptSelect } from '../../ui/components/Select';

type WhpptPagintionProps = {
  page: number
  total: number
  perPage: number
  perPageItems: any[]
  dark: boolean
  direction?: 'up' | 'down'
  changePage: (page: any) => any
}

export const WhpptPagination: FC<WhpptPagintionProps> = ({
  page,
  total,
  perPage,
  perPageItems,
  dark,
  direction,
  changePage
}) => {

  const firstNumber = page * perPage - perPage + 1;
  const secondNumber = total < page * perPage ? total : page * perPage;
  const shownItems = `${firstNumber} - ${secondNumber}`;

  return (
    <div className={`whppt-pagination ${dark ? 'whppt-pagination--dark' : ''}`}>
      <div className="whppt-pagination__per-page">
        <div className="whppt-pagination__per-page-select">
        <WhpptSelect
          id={''}
          label={''}
          value={perPage}
          items={perPageItems}
          onChange={() => console.log('select')}
          direction={direction}
        />
        </div>
      </div>

      <div className="whppt-pagination__results">
        {total ? `${shownItems} of ${total}` : `showing results ${shownItems}`}
      </div>

      <div className="whppt-pagination__buttons">
        <button disabled={page <= 1} onClick={() => changePage(page - 1)}>
          <WhpptIcon is="previous"></WhpptIcon>
        </button>
        <button disabled={page === total} onClick={() => changePage(page + 1)}>
          <WhpptIcon is="next"></WhpptIcon>
        </button>
      </div>
    </div>
  )
}
