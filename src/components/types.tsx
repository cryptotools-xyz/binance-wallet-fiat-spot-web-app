export type TickerPrice = {
    symbol: string,
    price: string
}

export type LineProps = {
    index: number,
    asset: string,
    total: number,
    tickerPrice: TickerPrice
}