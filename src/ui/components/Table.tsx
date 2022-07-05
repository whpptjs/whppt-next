import React, { FC } from 'react';
import { WhpptIcon } from './Icon';
import { WhpptPagination } from './Pagination';

type WhpptTableProps = {
  headers: any[];
  perPage: number;
  dense: boolean;
  hideHeaders: boolean;
  hideFooters: boolean;
  items: any[];
  actions?: any[];
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
  actions,
}) => {
  const tableContainerHeight =
    typeof height === 'number' ? `${height}px` : height;
    const perPageItems = [{ text: '5'}, { text: '10'}, { text: '25'}, { text: '50'}, { text: '100'}];

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
                {actions && actions.length && (
                  <th
                    className={
                      headers[0].align
                        ? `whppt-table__header--${headers[0].align}`
                        : ''
                    }
                    key="whppt-table-actions"
                  >
                    Actions
                  </th>
                )}
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
            {items.length ? (
              items.map((item, index: number) => (
                <tr key={index}>
                  {actions && actions.length && (
                    <td
                      key={`${index}-actions`}
                      className="whppt-table__actions"
                    >
                      {actions.map((action) => (
                        <div>
                          {(!action.show || action.show(item)) && (
                            <button
                              className="whppt-table__action"
                              onClick={() => action.action(item)}
                            >
                              <WhpptIcon is={action.icon} />
                              {action.info && (
                                <div className="whppt-table__action--info">
                                  {action.info}
                                </div>
                              )}
                            </button>
                          )}
                        </div>
                      ))}
                    </td>
                  )}

                  {headers.map((header, _index) => (
                    <td key={_index}>{item[header.value]}</td>
                  ))}
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
