// @ts-nocheck
import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useTable, useGlobalFilter, useFilters, useSortBy } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import { SearchAssetFilter } from "./SearchAssetFilter";

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
                Header: "$ Value",
                accessor: (row) => {
                
                    const tickerPrice = props.tickerPrices.find((tickerPrice) => tickerPrice.symbol === (row.asset + "USDT"));

                    if(tickerPrice) {
                        return <div>{tickerPrice.symbol} {tickerPrice.price}</div>;
                    }
                    
                    return <div>undef</div>;
                },
                disableFilters: true,
            },
        ],
        []
    );

    const defaultColumn = useMemo(
        () => ({
            Filter: SearchAssetFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data: props.data, defaultColumn }, useFilters, useGlobalFilter, useSortBy);

    const { globalFilter } = state;

    return (
        <>
            <h3>Global filters</h3>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

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
                                        Sort: {column.isSorted ? (column.isSortedDesc ? " ⬇️" : " ⬆️") : null}
                                    </div>
                                    <div>
                                        Filter: {column.canFilter ? column.render("Filter") : null}
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