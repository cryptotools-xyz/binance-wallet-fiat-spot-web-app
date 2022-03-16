import { useState } from "react"
import NumberFormat from 'react-number-format';
import { LineProps } from './types'

function Line({ index, balanceAsset, balanceTotal, tickerPrice }: LineProps) {

    const [tickerPriceInput, setTickerPriceInput] = useState(tickerPrice.price);
    const value = balanceTotal * parseFloat(tickerPriceInput);

    return <tr key={index}>
        <td >{balanceAsset}</td>
        <td>{balanceTotal}</td>
        <td>
            <div className="form-group">
                <input type="number" className="form-control" value={tickerPriceInput} onChange={e => setTickerPriceInput(e.target.value)} />
                <small className="form-text text-muted">
                    <NumberFormat value={tickerPriceInput} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </small>
            </div>
        </td>
        <td><NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></td>
    </tr>
}

export default Line;