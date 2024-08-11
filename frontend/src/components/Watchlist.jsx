

export const Watchlist = ({stock, watchlistPrices}) => {
  return (
      <li>
        {stock.stock_name}  ({stock.symbol}) - Price: {" "}
        {watchlistPrices[stock.symbol] || "loading..."}
      </li>
  )
}
