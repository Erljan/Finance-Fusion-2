import { useEffect, useState } from "react"
import {api} from "../api"

export const Stocks = () => {
    const [stockSymbol, setStockSymbol] = useState("")
    const [currPrice, setPrice] = useState(null)
    const [stockName, setStockName] = useState("")

    const getStockPrice = async(e)=>{
        e.preventDefault()

        const stocks = await api.get(`api/stock/${stockSymbol}/`)
        const sname = stocks.data.name
        const price = stocks.data.price

        setPrice(price)
        setStockName(sname)
        setStockSymbol("")
    }


  return (
    <>
        <div>
            <h1>Search stock</h1>
            <form action="" onSubmit={getStockPrice}>
                <input type="text" value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)}/>
            </form>

            <div>
                <h3>{stockName}</h3>
                <p>{currPrice}</p>
            </div>
        </div>
    </>
  )
}
