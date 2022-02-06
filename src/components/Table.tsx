import React from "react"
import Line from './Line'
import { TickerPrice, TableProps, Balance } from './types'

function Table(props: TableProps) {
    const { balances, tickerPrices } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">
                        balance.asset
                    </th>
                    <th scope="col">
                        balance.total
                    </th>
                    <th scope="col">
                        ticker.price in USDT
                    </th>
                    <th scope="col">
                        value
                    </th>
                </tr>
            </thead>
            <tbody>
                {balances && balances.map((balance: Balance, index: number) => {
                    const total = parseFloat(balance.free) + parseFloat(balance.locked);

                    const tickerPrice = tickerPrices.find((tickerPrice: TickerPrice) => tickerPrice.symbol === (balance.asset + "USDT"));

                    if (total > 0) {
                        return tickerPrice && <Line index={index} balanceAsset={balance.asset} balanceTotal={total} tickerPrice={tickerPrice} />
                    }
                })}
            </tbody>
        </table>
    );
}

export default Table;