import React from "react"
import NumberFormat from 'react-number-format';

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
                            <td><NumberFormat value={tickerPrice && tickerPrice.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></td>
                            <td><NumberFormat value={total * (tickerPrice && parseFloat(tickerPrice.price))} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></td>
                        </tr>
                    }
                })}
            </tbody>
        </table>
    );
}

export default Table;