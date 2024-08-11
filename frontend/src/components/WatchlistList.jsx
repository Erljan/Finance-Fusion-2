

export const WatchlistList = ({stock, watchlistPrices}) => {
  return (
      <li>
        {stock.stock_name}  ({stock.symbol}) - Price: {" "}
        {watchlistPrices[stock.symbol] || "loading..."}
      </li>
  )
}
