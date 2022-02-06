import React from "react"

function Table(props: any) {
    const { data: { balances } } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">
                        asset
                    </th>
                    <th scope="col">
                        total
                    </th>
                </tr>
            </thead>
            <tbody>
                {balances && balances.map((item: any, index: number) => {
                    const total = parseFloat(item.free) + parseFloat(item.locked);
                    
                    if (total > 0) {
                        return <tr key={index}>
                            <td >{item.asset}</td>
                            <td>{total}</td>
                        </tr>
                    }
                })}
            </tbody>
        </table>
    );
}

export default Table;