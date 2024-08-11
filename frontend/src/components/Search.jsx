import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Search = () => {
    const navigate = useNavigate()
    const [symbol, setSymbol] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(symbol){
            navigate(`/stock/${symbol.toUpperCase()}`)
        }
    }

  return (
    <form action="" onSubmit={handleSubmit}>
    <input
      type="text"
      value={symbol}
      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
    />
    {/* <button >Search</button> */}
  </form>
  )
}
