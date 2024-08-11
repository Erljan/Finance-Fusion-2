import { useEffect, useState } from "react";
import { api } from "../api";
import { Chart } from "../components/Chart";
import { Watchlist } from "../components/Watchlist";
import { useParams } from "react-router-dom";
// import { Search } from "../components/Search";

export const Stocks = () => {
//   const { symbol } = useParams();
  const [stockSymbol, setStockSymbol] = useState("");
  const [currPrice, setPrice] = useState(null);
  const [stockName, setStockName] = useState("");

  const [watchlist, setWatchlist] = useState([]);
  const [watchlistPrices, setWatchlistPrices] = useState([]);

  const [dataChart, setDataChart] = useState([]);
  const [fiftyLow, setFiftyLow] = useState(null);
  const [fiftyHigh, setFiftyHigh] = useState(null);
  const [dayLow, setDayLow] = useState(null);
  const [dayHigh, setDayHigh] = useState(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {

    getWatchlist();

    // console.log(watchlist)
    // console.log(watchlist.some(stock => stock.symbol === stockSymbol))
  }, []);




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



  const getStock = async (e) => {
    e.preventDefault()

    const stocks = await api.get(`api/stock/${stockSymbol}/`);
    const response = stocks.data;

    setPrice(response.price);
    setStockName(response.name);
    setDataChart(response.data);
    setFiftyHigh(response.fiftyHigh);
    setFiftyLow(response.fiftyLow);
    setDayHigh(response.dayHigh);
    setDayLow(response.dayLow);
    setSummary(response.summary);
  };


  

  const getWatchlist = async () => {
    const response = await api.get("api/stock/");
    const data = response.data;

    setWatchlist(data);
  };


  

  const addToWatchlist = async (e) => {
    e.preventDefault()
    if (stockSymbol && stockName) {
      try {
        const response = await api.post("api/stock/", {
          stock_name: stockName,
          symbol: stockSymbol,
        });

        console.log("Stock added to watchlist:", response.data);

        setStockName("");
        setStockSymbol("");
        setPrice(null);
        // getWatchlist();
      } catch (error) {
        console.error(
          "Error adding to watchlist",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error("Stock symbol or stock name is missing.");
    }
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
          const response = await api.get(`api/stock/${stock.symbol}/`);
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
    <>
      <div>
        <h1>Search stock</h1>
        <form action="" onSubmit={getStock}>
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          />
        </form>

        {/* ======CHART===== */}
        <Chart data={dataChart} width="100%" />

        {/* ==========Overview/Details========== */}
        <div>
          {currPrice ? (
            <div>
              <h3>{stockName}</h3>
              <p>Price: {currPrice}</p>
              <p>52 Wk High: {fiftyHigh}</p>
              <p>52 Wk Low: {fiftyLow}</p>
              <p>Today's High: {dayHigh}</p>
              <p>Today's Low: {dayLow}</p>
              <p>Summary: {summary}</p>
              <button
                onClick={addToWatchlist}
                disabled={watchlist.some(
                  (stock) => stock.stock_name === stockName
                )}
              >
                Add to Watchlist
              </button>
            </div>
          ) : (
            "Loading..."
          )}
        </div>

        {/* ==========WATCHLIST========= */}
        <div>
          {watchlist.map((stock, idx) => (
            <div key={idx}>
              <Watchlist
                stock={stock}
                idx={idx}
                watchlistPrices={watchlistPrices}
              />

              <button onClick={() => removeWatchlist(stock.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// import { useEffect, useState } from "react";
// import { api } from "../api";
// import { Chart } from "../components/Chart";
// import { Watchlist } from "../components/Watchlist";
// // import { Overview } from "../components/Overview";
// import { useParams } from "react-router-dom"; // Import useParams to get URL parameters

// export const Stocks = () => {
//   const { stockSymbol, setStockSymbol } = useParams(); // Get the stock symbol from the URL
// //   const [stockSymbol, setStockSymbol] = useState(symbol || "");
//   const [currPrice, setPrice] = useState(null);
//   const [stockName, setStockName] = useState("");
//   const [watchlist, setWatchlist] = useState([]);
//   const [watchlistPrices, setWatchlistPrices] = useState([]);
//   const [dataChart, setDataChart] = useState([]);
//   const [fiftyLow, setFiftyLow] = useState(null);
//   const [fiftyHigh, setFiftyHigh] = useState(null);
//   const [dayLow, setDayLow] = useState(null);
//   const [dayHigh, setDayHigh] = useState(null);
//   const [summary, setSummary] = useState("");

//   useEffect(() => {
//     if (stockSymbol) {
//       getStock(stockSymbol);
//     }
//     getWatchlist();
//   }, [stockSymbol]);

//   const getWatchlist = async () => {
//     const response = await api.get("api/stock/");
//     const data = response.data;
//     setWatchlist(data);
//   };

//   const getStock = async () => {
//     const stocks = await api.get(`api/stock/${stockSymbol}/`);
//     const response = stocks.data;
//     setPrice(response.price);
//     setStockName(response.name);
//     setDataChart(response.data);
//     setFiftyHigh(response.fiftyHigh);
//     setFiftyLow(response.fiftyLow);
//     setDayHigh(response.dayHigh);
//     setDayLow(response.dayLow);
//     setSummary(response.summary);
//   };

//   const addToWatchlist = async () => {
//     if (stockSymbol && stockName) {
//       try {
//         const response = await api.post("api/stock/", {
//           stock_name: stockName,
//           symbol: stockSymbol,
//         });

//         console.log("Stock added to watchlist:", response.data);

//         setStockName("");
//         setStockSymbol("");
//         setPrice(null);

//         getWatchlist();
//       } catch (error) {
//         console.error(
//           "Error adding to watchlist",
//           error.response ? error.response.data : error.message
//         );
//       }
//     } else {
//       console.error("Stock symbol or stock name is missing.");
//     }
//   };

//   const removeWatchlist = async (id) => {
//     await api.delete(`api/stock/delete/${id}/`);
//     getWatchlist();
//   };

//   const updateWatchlistPrices = async () => {
//     if (watchlist.length === 0) return;

//     try {
//       const prices = await Promise.all(
//         watchlist.map(async (stock) => {
//           const response = await api.get(`api/stock/${stock.symbol}/`);
//           return { symbol: stock.symbol, price: response.data.price };
//         })
//       );

//       const newPrices = prices.reduce((acc, stock) => {
//         acc[stock.symbol] = stock.price;
//         return acc;
//       }, {});

//       setWatchlistPrices(newPrices);
//     } catch (error) {
//       console.error("Error updating watchlist prices:", error);
//     }
//   };

//   const throttle = (func, limit) => {
//     let inThrottle;
//     return function (...args) {
//       const context = this;
//       if (!inThrottle) {
//         func.apply(context, args);
//         inThrottle = true;
//         setTimeout(() => (inThrottle = false), limit);
//       }
//     };
//   };

//   return (
//     <>
//       <div>
//         {/* <Search /> Include your Search component */}
//         {/* <h1>Search stock</h1> */}

//         <Chart data={dataChart} width="100%" />

//         {/* ==========Overview/Details========== */}
//         <div>
//           {currPrice ? (
//             <div>
//               <h3>{stockName}</h3>
//               <p>Price: {currPrice}</p>
//               <p>52 Wk High: {fiftyHigh}</p>
//               <p>52 Wk Low: {fiftyLow}</p>
//               <p>Today's High: {dayHigh}</p>
//               <p>Today's Low: {dayLow}</p>
//               <p>Summary: {summary}</p>
//               <button
//                 onClick={addToWatchlist}
//                 disabled={watchlist.some(
//                   (stock) => stock.stock_name === stockName
//                 )}
//               >
//                 Add to Watchlist
//               </button>
//             </div>
//           ) : null}
//         </div>

//         {/* ==========WATCHLIST========= */}
//         <div>
//           {watchlist.map((stock, idx) => (
//             <div key={idx}>
//               <Watchlist
//                 stock={stock}
//                 idx={idx}
//                 watchlistPrices={watchlistPrices}
//               />

//               <button onClick={() => removeWatchlist(stock.id)}>Remove</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
