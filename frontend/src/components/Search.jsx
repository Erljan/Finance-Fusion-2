import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
// import { Stocks } from "../pages/Stocks"


export const Search = ({setStockSymbol, stockSymbol, getStock}) => {
    // const navigate = useNavigate()
    // const [symbol, setSymbol] = useState("")

    // const handleSubmit = () => {
    //     // e.preventDefault()
        
    //     // if(symbol){
    //     //     navigate(`/stock/${symbol.toUpperCase()}`)
    //     // }

    // }

  return (
    <>
    <form action="" onSubmit={getStock}>
    <input
      type="text"
      value={stockSymbol}
      onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
    />
    {/* <button >Search</button> */}
  </form>
    
    <Outlet />
    </>
  )
}
