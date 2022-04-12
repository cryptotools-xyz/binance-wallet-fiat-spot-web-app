// @ts-nocheck
import React from "react";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    column: any
}

/* eslint react/prop-types: 0 */
export const NumberValueFilter = (column: { filterValue, setFilter, preFilteredRows, id }): Props => {
    const { filterValue, setFilter } = column;

    /*const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);*/

    return (
        <div>
            Search:
            <input type="number" value={filterValue || ""} /*onChange={(e) => setFilter(e.target.value)}*/ />
        </div>
    );
};