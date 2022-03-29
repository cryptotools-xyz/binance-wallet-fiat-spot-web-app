// @ts-nocheck
import React from "react";  

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFlter: any
}

/* eslint react/prop-types: 0 */
export const GlobalFilter = ({ filter, setFilter }): Props => {
    return (
        <div>
            Search:
            <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
        </div>
    );
};