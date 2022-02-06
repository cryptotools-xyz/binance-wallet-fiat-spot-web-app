import React from "react"

type TickerPrice = {
    symbol: string,
    price: string
}

function Table(props: any) {
    const { data: { balances }, tickerPriceData } = props;

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
                    <th scope="col">
                        price
                    </th>
                    <th scope="col">
                        value
                    </th>
                </tr>
            </thead>
            <tbody>
                {balances && balances.map((item: any, index: number) => {
                    const total = parseFloat(item.free) + parseFloat(item.locked);

                    const tickerPrice = tickerPriceData.find((tickerPrice: TickerPrice) => tickerPrice.symbol === (item.asset + "USDT"));

                    if (total > 0) {
                        return <tr key={index}>
                            <td >{item.asset}</td>
                            <td>{total}</td>
                            <td>{tickerPrice && tickerPrice.price}</td>
                            <td>{total * (tickerPrice && parseFloat(tickerPrice.price))}</td>
                        </tr>
                    }
                })}
            </tbody>
        </table>
    );
}

export default Table;