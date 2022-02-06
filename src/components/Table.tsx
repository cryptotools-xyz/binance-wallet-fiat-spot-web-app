import React from "react"

function Table(props: any) {
    const { balances } = props;

    return (
        <table className="table">
            <thead>
                <th scope="col">
                    asset
                </th>
                <th scope="col">
                    total
                </th>
            </thead>
            <tbody>
                {
                    balances.map((item: any, index: number) => {

                        return <tr key={index}>
                            <td >{item.asset}</td>
                            <td>{item.free + item.locked}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
}

export default Table;