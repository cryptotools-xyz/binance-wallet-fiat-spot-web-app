// @ts-nocheck
import React, { useMemo } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import { GlobalFilter } from "./GlobalFilter";
import { SearchAssetFilter } from "./SearchAssetFilter";

function ReactTable(props) {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Asset',
                accessor: 'asset',
                Filter: SearchAssetFilter
            },
            {
                Header: 'Free',
                accessor: 'free',
                disableFilters: true,
            },
            {
                Header: 'Locked',
                accessor: 'locked',
                disableFilters: true,
            },
        ],
        []
    )

    const defaultColumn = useMemo(
        () => ({
            Filter: SearchAssetFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data: props.data, defaultColumn }, useFilters, useGlobalFilter)

    const { globalFilter } = state

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            <hr />

            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div>
                                        {column.render('Header')}
                                    </div>
                                    <div>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ReactTable;