export type TickerPrice = {
    symbol: string,
    price: string
}

export type TableProps = {
    balances: Balance[],
    tickerPrices: TickerPrice[]
}

export type LineProps = {
    index: number,
    balanceAsset: string,
    balanceTotal: number,
    tickerPrice: TickerPrice
}

export type Balance = {
    asset: string,
    free: string,
    locked: string
}