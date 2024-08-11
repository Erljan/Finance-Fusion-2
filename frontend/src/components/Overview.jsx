

export const Overview = ({stockName, currPrice, addToWatchlist, watchlist, fiftyHigh, }) => {
  return (
    <>
         {/* <h3>{stockName}</h3>
          <p>Price: {currPrice}</p>
          <p>52 Wk High: {fiftyHigh}</p>
          <p>52 Wk High: {fiftyHigh}</p>
          <p>52 Wk High: {fiftyHigh}</p>
          <p>52 Wk High: {fiftyHigh}</p>
          {currPrice ? 
          <button onClick={addToWatchlist} disabled={watchlist.some(stock => stock.stock_name === stockName)}>
            Add to Watchlist
          </button> : null
          } */}
    </>
  )
}
