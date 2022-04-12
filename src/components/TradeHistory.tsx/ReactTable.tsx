// @ts-nocheck
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useTable, useFilters, useSortBy } from "react-table";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}

function ReactTable(props: Props) {

    const columns = React.useMemo(
        () => [
            {
                Header: "trade.time",
                accessor: "time",
                disableFilters: true,
            },
            {
                Header: "trade.id",
                accessor: "id",
                disableFilters: true,
            },
            {
                Header: "trade.symbol",
                accessor: "symbol",
                disableFilters: true,
            },
            {
                Header: "order.status",
                accessor: "order.status",
                disableFilters: true,
            },
            {
                Header: "order.type",
                accessor: "order.type",
                disableFilters: true,
            },
            {
                Header: "order.side",
                accessor: "order.side",
                disableFilters: true,
            },
            {
                Header: "trade.price",
                accessor: "price",
                disableFilters: true,
            },
            {
                Header: "trade.qty",
                accessor: "qty",
                disableFilters: true,
            },
            {
                Header: "trade.orderId",
                accessor: "orderId",
                disableFilters: true,
            },
            {
                Header: "order.orderId",
                accessor: "order.orderId",
                disableFilters: true,
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns, data: props.data,
    }, useFilters, useSortBy);

    return (
        <>
            <h3>Global filters</h3>

            <h3>Table</h3>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, j) => (
                                <th key={j} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div>
                                        {column.render("Header")}
                                    </div>
                                    <div>
                                        {column.isSorted ? (column.isSortedDesc ? " ⬇️" : " ⬆️") : " ➡️"}
                                    </div>
                                    <div>
                                        {column.canFilter ? column.render("Filter") : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr key={i} {...row.getRowProps()}>
                                {row.cells.map((cell, j) => {
                                    return (
                                        <td
                                            key={j}
                                            {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ReactTable;