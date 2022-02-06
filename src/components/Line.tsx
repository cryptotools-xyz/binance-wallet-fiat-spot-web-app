import React from "react"
import NumberFormat from 'react-number-format';
import { TickerPrice, LineProps } from './types'

function Line({ index, asset, total, tickerPrice }: LineProps) {
    return <tr key={index}>
        <td >{asset}</td>
        <td>{total}</td>
        <td><NumberFormat value={tickerPrice.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></td>
        <td><NumberFormat value={parseFloat(tickerPrice.price)} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></td>
    </tr>
}

export default Line;