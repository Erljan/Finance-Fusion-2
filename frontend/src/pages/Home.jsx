// import { useContext } from "react"
import { useState } from "react"
import { Watchlist } from "../components/Watchlist"
// import { Chart } from "../components/Chart"

export const Home = () => {
  const [stock, setStock] = useState("")

  return (
    <div>
      <Watchlist />
      {/* <Chart width="80%" height={2} /> */}
    </div>
  )
}
