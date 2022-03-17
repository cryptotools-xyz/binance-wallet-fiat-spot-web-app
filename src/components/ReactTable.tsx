// @ts-nocheck
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { useTable, useGlobalFilter } from 'react-table'
import { GlobalFilter } from "./GlobalFilter";

function ReactTable(props) {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Asset',
                accessor: 'asset',
            },
            {
                Header: 'Free',
                accessor: 'free',
            },
            {
                Header: 'Locked',
                accessor: 'locked',
            },
        ],
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
    } = useTable({ columns, data: props.data }, useGlobalFilter)

    const { globalFilter } = state

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
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