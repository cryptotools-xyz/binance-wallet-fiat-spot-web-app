import React from "react"
import Line from './Line'
import { TickerPrice } from './types'

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
                        return tickerPrice && <Line index={index} asset={item.asset} total={total} tickerPrice={tickerPrice} />
                    }
                })}
            </tbody>
        </table>
    );
}

export default Table;