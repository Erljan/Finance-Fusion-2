import { useEffect, useState } from "react";
import { api } from "../api";
import { Chart } from "../components/Chart";

export const Stocks = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [currPrice, setPrice] = useState(null);
  const [stockName, setStockName] = useState("");

  const [watchlist, setWatchlist] = useState([]);


  const [dataChart, setDataChart] = useState([]);
  const [fiftyLow, setFiftyLow] = useState(null);
  const [fiftyHigh, setFiftyHigh] = useState(null);
  const [dayLow, setDayLow] = useState(null);
  const [dayHigh, setDayHigh] = useState(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    getStock()
    getWatchlist()

  }, []);



  const getWatchlist = async () => {
    const response = await api.get("api/stock/");
    const data = response.data;

    setWatchlist(data);
  };





  const getStock = async (e) => {
    if(e) e.preventDefault();

    const symbol = stockSymbol || "AAPL"
    const stocks = await api.get(`api/stock/${symbol}/`);
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







  const addToWatchlist = async (e) => {
    e.preventDefault()
    if (stockSymbol && stockName) {
      try {
        const response = await api.post("api/stock/", {
          stock_name: stockName,
          symbol: stockSymbol,
        });

        console.log("Stock added to watchlist:", response.data);

        setWatchlist((prevWatchlist) => [...prevWatchlist, response.data])
        // setStockName("");
        // setStockSymbol("");
        // setPrice(null);
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





  const removeWatchlist = async (stockSymbol) => {
    const stockToRemove = watchlist.find((stock) => stock.symbol === stockSymbol)
    if(stockToRemove){
        try {
            await api.delete(`api/stock/delete/${stockToRemove.id}/`);
            setWatchlist(watchlist.filter((stock) => stock.id !== stockToRemove.id))
            
        } catch (error) {
            console.error(
                "Error removing from watchlist",
                error.response ? error.response.data : error.message
              );
        }
    }
    // getWatchlist();
  };


  const isInWatchlist = watchlist.some((stock) => stock.stock_name === stockName)





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

              {isInWatchlist ? <button onClick={() => removeWatchlist(stockSymbol)}>Remove from watchlist</button> : <button onClick={addToWatchlist}>Add to Watchlist</button>}

            </div>
          ) : (
            "Loading..."
          )}
        </div>

      </div>
    </>
  );
};

