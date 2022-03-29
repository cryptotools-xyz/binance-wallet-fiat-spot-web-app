// @ts-nocheck
import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useTable, useFilters, useSortBy } from "react-table";
import { SearchAssetFilter } from "./SearchAssetFilter";
import NumberFormat from "react-number-format";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tickerPrices: any,
}

function ReactTable(props: Props) {

    const columns = React.useMemo(
        () => [
            {
                Header: "Asset",
                accessor: "asset",
                Filter: SearchAssetFilter
            },
            {
                Header: "Free",
                accessor: "free",
                disableFilters: true,
            },
            {
                Header: "Locked",
                accessor: "locked",
                disableFilters: true,
            },
            {
                id: "value",
                Header: "$ Value",
                accessor: (row) => {

                    const tickerPrice = props.tickerPrices.find((tickerPrice) => tickerPrice.symbol === (row.asset + "USDT"));

                    let totalValue;
                    if (tickerPrice) {
                        totalValue = row.free * tickerPrice.price;
                    } else {
                        totalValue = 0;
                    }

                    return totalValue;
                    return <NumberFormat value={totalValue} displayType={"text"} thousandSeparator={true} prefix={"$ "} decimalScale={2} />;
                },
                disableFilters: true,
            },

        ],
        []
    );

    const initialState = useMemo(
        () => ({
            sortBy: [
                {
                    id: "value",
                    desc: true
                }
            ]
        }),
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
        initialState,
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