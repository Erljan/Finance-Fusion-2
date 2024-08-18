// import { useContext } from "react"
// import { useState } from "react"
import { Watchlist } from "../components/Watchlist"
// import { api } from "../api"
// import { Chart } from "../components/Chart"

export const Home = () => {
  // const [dataChart, setDataChart] = useState("")
  // const [symbol, setSymbol] = useState("")

  // const getChart = async() => {
  //   const response = await api.get(`api/stock/${symbol}/`)
  //   setDataChart(response.data.data)
  // }



  return (
    <div>
      <Watchlist />
      {/* <Chart width="80%" height={2} /> */}
    </div>
  )
}
