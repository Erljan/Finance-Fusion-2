import { useEffect, useState } from "react";
// import { WatchlistList } from "../components/WatchlistList";
import { api } from "../api";

// const WatchlistList = ({stock, watchlistPrices}) => {
//     return (
//         <li>
//           {stock.stock_name}  ({stock.symbol}) - Price: {" "}
//           {watchlistPrices[stock.symbol] || "loading..."}
//         </li>
//     )
//   }

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistPrices, setWatchlistPrices] = useState([]);

  useEffect(() => {
    const throttledUpdateWatchlistPrices = throttle(
      updateWatchlistPrices,
      30000
    ); // Throttle every 30 seconds

    throttledUpdateWatchlistPrices();

    const interval = setInterval(() => {
      updateWatchlistPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [watchlist]);

  useEffect(() => {
    getWatchlist();
  }, []);

  const getWatchlist = async () => {
    const response = await api.get("api/stock/");
    const data = response.data;

    setWatchlist(data);
  };

  const removeWatchlist = async (id) => {
    await api.delete(`api/stock/delete/${id}/`);
    getWatchlist();
  };

  const updateWatchlistPrices = async () => {
    if (watchlist.length === 0) return;

    try {
      const prices = await Promise.all(
        watchlist.map(async (stock) => {
          const response = await api.get(`api/stock/prices/${stock.symbol}/`);
          return { symbol: stock.symbol, price: response.data.price };
        })
      );

      const newPrices = prices.reduce((acc, stock) => {
        acc[stock.symbol] = stock.price;
        return acc;
      }, {});

      setWatchlistPrices(newPrices);
      // console.log("Updated watchlist prices:", newPrices)
    } catch (error) {
      console.error("Error updating watchlist prices:", error);
    }
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  return (
    <div className="watchlist">
      <h3>Watchlist</h3>
      {watchlist.map((stock, idx) => (
        <div key={idx} className="each-watchlist">
          <li>
            {stock.stock_name} ({stock.symbol}) - Price: <span className="watchlist-price">${watchlistPrices[stock.symbol] || "loading..."}</span>
            {/* {watchlistPrices[stock.symbol] || "loading..."} */}
          </li>

          <button className="remove-btn" onClick={() => removeWatchlist(stock.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
