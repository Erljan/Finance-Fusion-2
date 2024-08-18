import { useEffect, useState } from "react";
import { Watchlist } from "../components/Watchlist"
import { api } from "../api"
import { BudgetChart } from "../components/BudgetChart"

export const Home = () => {
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    fetchTransac();
  }, []);

  const fetchTransac = async () => {
    try {
      const response = await api.get("api/budget/transactions/");
      setTransactions(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="dashboard">
      <div className="watchlist-dashboard">
        <Watchlist />

      </div>

      <div className="budget-chart-dashboard">
        <h3>Transactions</h3>
        <BudgetChart transactions={transactions} width="100%" height={2}/>
      </div>

      <div className="dashboard-news">
        <div>
          News
        </div>
      </div>
    </div>
  )
}
