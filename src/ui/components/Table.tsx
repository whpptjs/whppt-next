import React, { FC, useState, useEffect } from 'react';
import { WhpptPagination } from './Pagination';

type WhpptTableProps = {
  headers: any[];
  perPage: number;
  dense: boolean;
  hideHeaders: boolean;
  hideFooters: boolean;
  items: any[];
  height: string | number;
  fixedHeader: boolean;
  page: number;
  total: number;
  setCurrentPage: (page: any) => void;
};

export const WhpptTable: FC<WhpptTableProps> = ({
  headers,
  perPage,
  dense,
  hideHeaders,
  hideFooters,
  items,
  height,
  fixedHeader,
  page,
  total,
  setCurrentPage,
}) => {
  const tableContainerHeight =
    typeof height === 'number' ? `${height}px` : height;
  const [internalItems, setInternalItems] = useState([]);
  const perPageItems = [{ text: '5'}, { text: '10'}, { text: '25'}, { text: '50'}, { text: '100'}];

  useEffect(() => {
    const headersValues = headers.map((h) => h.value);

    const internalItems = items.map((item) => {
      const internalItem = {};

      for (const value of headersValues) {
        internalItem[value] = item[value];
      }

      return internalItem;
    });

    setInternalItems(internalItems);
  }, [items]);

  return (
    <div className={`whppt-table ${dense ? 'whppt-table--dense' : ''}`}>
      <div
        className="whppt-table__container"
        style={{ height: tableContainerHeight }}
      >
        <table>
          {!hideHeaders && headers.length && (
            <thead
              className={
                fixedHeader && height ? 'whppt-table__headers--fixed' : ''
              }
            >
              <tr>
                {headers.map((header, index) => (
                  <th
                    className={
                      header.align ? `whppt-table__header--${header.align}` : ''
                    }
                    key={index}
                  >
                    {header.text}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {!hideFooters && (
            <tfoot className="whppt-table__footer">
              <tr>
                <td colSpan={headers.length}>
                  <div className="whppt-table__pagination">
                    <WhpptPagination
                      page={page}
                      perPage={perPage}
                      perPageItems={perPageItems}
                      total={total}
                      dark={true}
                      direction={'down'}
                      changePage={setCurrentPage}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          )}

          <tbody>
            {internalItems.length ? (
              internalItems.map((item, index: number) => (
                <tr key={index}>
                  {Object.values(item).map(
                    (value: string | number, index: number) => (
                      <td key={index}>{value}</td>
                    )
                  )}
                </tr>
              ))
            ) : (
              <tr className="whppt-table--no-data">
                <td colSpan={headers.length}>No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
