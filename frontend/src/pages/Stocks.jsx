import { useEffect, useState } from "react"
import {api} from "../api"

export const Stocks = () => {
    const [stockSymbol, setStockSymbol] = useState("")
    const [currPrice, setPrice] = useState(null)
    const [stockName, setStockName] = useState("")

    const [watchlist, setWatchlist] = useState([])
    const [watchlistPrices, setWatchlistPrices] = useState([])


    const getWatchlist = async() => {
        const response = await api.get('api/stock/')
        const data = response.data

        setWatchlist(data)

    }

    useEffect(()=>{
        getWatchlist()
    },[])


    useEffect(()=>{
        // getWatchlist()
        // console.log(watchlist)
        const throttledUpdateWatchlistPrices = throttle(updateWatchlistPrices, 5000); // Throttle every 5 seconds

        throttledUpdateWatchlistPrices();

        const interval = setInterval(() => {
            updateWatchlistPrices()
        }, 30000)

        return () => clearInterval(interval)
    },[watchlist])

    const getStockPrice = async(e)=>{
        e.preventDefault()

        const stocks = await api.get(`api/stock/${stockSymbol}/`)
        const sname = stocks.data.name
        const price = stocks.data.price

        setPrice(price)
        setStockName(sname)
    }


    const addToWatchlist = async() => {
        if(stockSymbol && stockName){
            try {
                const response = await api.post("api/stock/", { 
                    stock_name:stockName,
                    symbol:stockSymbol,
                });

                console.log("Stock added to watchlist:", response.data)

                // setWatchlist(prevList => [...prevList, response.data])

                setStockName("")
                setStockSymbol("")
                setPrice(null)

                getWatchlist()
                
            } catch (error) {
                console.error('Error adding to watchlist', error.response ? error.response.data : error.message)
            } 
        }else {
            console.error('Stock symbol or stock name is missing.')
        }


    }




    const removeWatchlist = async(id) => {
        await api.delete(`api/stock/delete/${id}/`)
        getWatchlist()
    }

    
    const updateWatchlistPrices = async () => {

        if(watchlist.length === 0) return;

            try {
                const prices = await Promise.all(
                    watchlist.map(async (stock) => {
                        const response = await api.get(`api/stock/${stock.symbol}/`)
                        return { symbol: stock.symbol, price: response.data.price}
                    })
                )

                // console.log("fetched prices:", prices)

                const newPrices = prices.reduce((acc, stock) => {
                    acc[stock.symbol] = stock.price
                    return acc
                }, {})
    
                setWatchlistPrices(newPrices)
                // console.log("Updated watchlist prices:", newPrices)
    
            } catch (error) {
                console.error("Error updating watchlist prices:", error);
            }

    }

    const throttle = (func, limit) => {
        let inThrottle;
        return function (...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };




  return (
    <>
        <div>
            <h1>Search stock</h1>
            <form action="" onSubmit={getStockPrice}>
                <input type="text" value={(stockSymbol).toUpperCase()} onChange={(e) => setStockSymbol(e.target.value)}/>
            </form>

            <div>
                <h3>{stockName}</h3>
                <p>{currPrice}</p>
                 <button onClick={addToWatchlist} disabled={!stockName}>Add to Watchlist</button>
            </div>

            <div>
                {
                    watchlist.map((stock, idx) => (
                        <div key={idx}>
                            <li>
                                {stock.stock_name}   ({stock.symbol}) - Price: {watchlistPrices[stock.symbol] || "Loading..."} 
                            </li>
                            <button onClick={() => removeWatchlist(stock.id)}>Remove</button>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
