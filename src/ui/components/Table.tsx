import React, { FC, useId } from 'react';
import { WhpptIcon } from './Icon';
import { WhpptPagination } from './Pagination';
import { WhpptLink } from './WhpptLink';

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
  setPerPage: (page: any) => void;
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
  setPerPage,
  actions,
}) => {
  const tableId = useId();
  const tableContainerHeight = typeof height === 'number' ? `${height}px` : height;
  const perPageItems = [{ text: '5' }, { text: '10' }, { text: '25' }, { text: '50' }, { text: '100' }];

  return (
    <div className={`whppt-table ${dense ? 'whppt-table--dense' : ''}`}>
      <div className="whppt-table__container" style={{ height: tableContainerHeight }}>
        <table>
          {!hideHeaders && headers.length && (
            <thead className={fixedHeader && height ? 'whppt-table__headers--fixed' : ''}>
              <tr>
                {headers.map((header, index) => (
                  <th
                    className={header.align ? `whppt-table__header--${header.align}` : 'whppt-table__header--left'}
                    key={`header_${tableId}_${index}`}>
                    {header.text}
                  </th>
                ))}
                {actions && actions.length !== 0 && (
                  <th
                    className={headers[0].align ? `whppt-table__header--${headers[0].align}` : 'whppt-table__header--left'}
                    key="whppt-table-actions">
                    Actions
                  </th>
                )}
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
                      changePage={setCurrentPage}
                      setPerPage={setPerPage}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          )}

          <tbody>
            {items.length ? (
              items.map((item, index: number) => (
                <tr key={`${tableId}_${index}_row`}>
                  {headers.map((header, _index) => (
                    <td key={`${tableId}_value_${_index}`}>
                      {header.type === 'boolean' ? (
                        <div>
                          <div className={`whppt-status-pill ${item[header.value] ? 'whppt-status-pill--active-value' : ''}`}>
                            {item[header.value] ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      ) : header.type === 'inventory' ? (
                        <div>
                          <div
                            className={`whppt-table__inventory ${
                              !item[header.value] || item[header.value] === 0 ? 'whppt-table__inventory--out-of-stock' : ''
                            }`}>
                            {item[header.value] || 0} in stock
                          </div>
                        </div>
                      ) : header.type === 'link' ? (
                        <div>
                          <WhpptLink link={{ type: 'page', href: item[header.value], text: item[header.value] }}></WhpptLink>
                        </div>
                      ) : (
                        <div>
                          {header.prefix ? `${header.prefix} ` : ''}
                          {item[header.value]}
                          {header.affix ? `${header.affix} ` : ''}
                        </div>
                      )}
                    </td>
                  ))}
                  {actions && actions.length !== 0 && (
                    <td key={`${tableId}_${index}-actions`} className="whppt-table__actions">
                      {actions.map((action, actionIndex) => (
                        <div key={`${tableId}_${actionIndex}_action`}>
                          {(!action.show || action.show(item)) && (
                            <button className="whppt-table__action" onClick={() => action.action(item)}>
                              <WhpptIcon is={action.icon} />
                              {action.info && <div className="whppt-table__action--info">{action.info}</div>}
                            </button>
                          )}
                        </div>
                      ))}
                    </td>
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
