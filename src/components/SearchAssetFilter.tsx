// @ts-nocheck
import React from "react";

type Props = {
    column: any
}

/* eslint react/prop-types: 0 */
export const SearchAssetFilter = ({ column }): Props => {
    const { filterValue, setFilter } = column;

    return (
        <div>
            Search: 
            <input value={filterValue || ""} onChange={(e) => setFilter(e.target.value)} />
        </div>
    );
};