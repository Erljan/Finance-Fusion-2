import { useEffect, useState } from "react";
import { api } from "../api";
import { Chart } from "../components/Chart";

export const Stocks = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  // const [symbol, setSymbol] = useState("")
  const [currPrice, setPrice] = useState(null);
  const [stockName, setStockName] = useState("");

  const [watchlist, setWatchlist] = useState([]);

  const [dataChart, setDataChart] = useState([]);
  const [fiftyLow, setFiftyLow] = useState(null);
  const [fiftyHigh, setFiftyHigh] = useState(null);
  const [dayLow, setDayLow] = useState(null);
  const [dayHigh, setDayHigh] = useState(null);
  const [summary, setSummary] = useState("");
  const [currency, setCurrency] = useState("");
  const [news, setNews] = useState([])

  useEffect(() => {
    getStock();
    getWatchlist();
  }, []);

  const getWatchlist = async () => {
    const response = await api.get("api/stock/");
    const data = response.data;

    setWatchlist(data);
  };

  const getStock = async (e) => {
    if (e) e.preventDefault();

    // const formData = new FormData(e.target)

    const symbol = stockSymbol;
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
    setCurrency(response.currency);
    setNews(response.news)
    // if(news){
    //   news.map((img) => setThumbnail(img.thumbnail.resolutions[0].url))
    // }

    setStockSymbol(symbol)
  };




  const addToWatchlist = async (e) => {
    e.preventDefault();
    if (currPrice && stockName) {
      try {
        
        const response = await api.post("api/stock/", {
          stock_name: stockName,
          symbol: stockSymbol,
        });

        console.log("Stock added to watchlist:", response.data);

        setWatchlist((prevWatchlist) => [...prevWatchlist, response.data]);
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
    const stockToRemove = watchlist.find(
      (stock) => stock.symbol === stockSymbol
    );
    if (stockToRemove) {
      try {
        await api.delete(`api/stock/delete/${stockToRemove.id}/`);
        setWatchlist(
          watchlist.filter((stock) => stock.id !== stockToRemove.id)
        );
      } catch (error) {
        console.error(
          "Error removing from watchlist",
          error.response ? error.response.data : error.message
        );
      }
    }
  };




  const isInWatchlist = watchlist.some(
    (stock) => stock.stock_name === stockName
  );




  return (
    <>
      <div className="stocks-container">
        {/* <div className="stock-search-details"> */}
          {/* ==========Search========== */}
          <div className="search-container">
            <form action="" onSubmit={getStock} className="search-form">
              <input
                type="text"
                value={stockSymbol}
                className="search-input"
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                placeholder="Search for stock..."
              />
              <input
                type="submit"
                value="Search"
                id=""
                className="search-btn"
              />
            </form>
          </div>



          {/* ==========Overview/Details========== */}
          <div className="stock-details">
            {currPrice ? (
              <div>
                <h3 className="stock-name">{stockName}</h3>
                <p className="stock-price">
                  {currPrice} <span className="span-curr">{currency}</span>
                </p>
                <hr />
                <p className="detail-tags">52 Wk High: {fiftyHigh}</p>
                <hr />
                <p className="detail-tags">52 Wk Low: {fiftyLow}</p>
                <hr />
                <p className="detail-tags">Today's High: {dayHigh}</p>
                <hr />
                <p className="detail-tags">Today's Low: {dayLow}</p>
                <hr />
                <p className="detail-tags">Currency: {currency}</p>
                <hr />

                {isInWatchlist ? (
                  <button
                    onClick={() => removeWatchlist(stockSymbol)}
                    className="remove-watchlist-btn"
                  >
                    Remove from watchlist
                  </button>
                ) : (
                  <button onClick={addToWatchlist} className="add-btn">
                    Add to Watchlist
                  </button>
                )}
              </div>
            ) : (
              <div>Loading...</div>
              // "Loading..."
            )}
          {/* </div> */}
        </div>


        {/* ======CHART===== */}
        <div className="stockpage-chart">
          <Chart data={dataChart} width="100%" height={1.5} />
        </div>


        <div className="summary">
          <p><span className="sum">Summary: </span>{summary}</p>
        </div>

        <div className="stock-news">
          {
            news ? <h1>Latest News related to {stockName}</h1> : <h1>No news</h1>
          }

          <div className="news-container">


          {news.map((snews,idx) => (
            <div key={idx} className="each-news">

                <img src={snews.thumbnail} alt="" />
                <hr />
                <p><a href={snews.link} target="_blank">{snews.title}</a></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
