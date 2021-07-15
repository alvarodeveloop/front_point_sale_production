import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import matchSorter from 'match-sorter'
import { Button, Row, Col } from 'react-bootstrap'
import "styles/components/table.scss";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar en ${count} registros...`}
      className="inputPageFilter"
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function DataTable({ columns, data, menuTop, headerColor, headerFontColor, pageSizeHandler }) {
  // Use the state and functions returned from useTable to build your UI

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0, pageSize: pageSizeHandler[0] },
    },
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table

  return (
    <div className="table_responsive_eddit">
      {menuTop ? (
        <div className="pagination">
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </Button>{' '}
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </Button>{' '}
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </Button>{' '}
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </Button>{' '}
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>
          <span className="ml-3">
            | <span className="ml-2">Ir a la Página:{' '}</span>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              className="inputPage"
              onChange={(e) => {
                if (e.target.value > pageOptions.length) {
                  e.target.value = 1
                }
              }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            className="inputPage"
          >
            {pageSizeHandler.map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>

      ) : ''}
      <table {...getTableProps()} className="table table-bordered">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-center">
              {headerGroup.headers.map(column => (

                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ backgroundColor: headerColor ? headerColor : "rgb(218, 236, 242)", color: headerFontColor ? headerFontColor : "black" }}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-center">
          {page.map(
            (row, i) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td style={{ position: "relative" }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
      <Row className="justify-content-center">
        <Col lg={4} xl={4} md={12} className="text-center mb-2 mb-lg-0">

          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </Button>
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </Button>
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button size="sm" style={{ height: '40px' }} className="button-pagination" variant="secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </Button>
          <br className="d-block d-xl-none" />
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>
        </Col>
        <Col xl={4} lg={6} md={6} sm={6} xs={12} className="text-center mb-2 mb-lg-0">
          <span className="ml-3">
            <span className="ml-2 d-none d-xl-inline-block">Ir a la Página:{' '}</span>
            <span className="ml-2 d-inline-block d-xl-none text-center">Página:{' '}</span>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              className="inputPage"
              onChange={(e) => {
                if (e.target.value > pageOptions.length) {
                  e.target.value = 1
                }
              }}
            />
          </span>{' '}
        </Col>
        <Col lg={2} xl={2} md={6} sm={6} xs={12} className="text-center">
          <span className="ml-2 d-inline-block d-lg-none">N página:{' '}</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            className="inputPage"
          >
            {pageSizeHandler.map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </div>

  )
}

const Table = ({ data, columns, menuTop, headerColor, headerFontColor, pageSizeHandler }) => {
  pageSizeHandler = pageSizeHandler ? pageSizeHandler : [10, 20, 30, 40, 50];
  return (
    <DataTable pageSizeHandler={pageSizeHandler} data={data} columns={columns} menuTop={menuTop} headerFontColor={headerFontColor} headerColor={headerColor} />
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  menuTop: PropTypes.bool,
  headerColor: PropTypes.string,
  headerFontColor: PropTypes.string,
  pageSizeHandler: PropTypes.array,
}

export default Table
