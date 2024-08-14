import { useEffect, useState } from "react";
import { api } from "../api";


export const Budget = () => {
  const [transactions, setTransactions] = useState([])
  const [budget, setBudget] = useState(0)
  const [upBudget, setUpBudget] = useState(0)


  useEffect(()=>{
    fetchTransac()
    getBudget()
    console.log(budget)

  },[])


  const fetchTransac = async()=>{
    try {
      const response = await api.get('api/budget/transactions/')
      setTransactions(response.data)
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getBudget = async() => {
    try {
      const response = await api.get("api/budget/")
      setBudget(response.data[0].budgetAmt)
      // console.log(response.data[0].budgetAmt)
    } catch (error) {
      console.log(error)
      
    }
  }


  const updateBudget = async() => {
    try {
      await api.put('api/budget/1/', {upBudget})
      // setBudget(response.data[0].budgetAmt)
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
      <h1>{budget}</h1>
      <form action="" onSubmit={updateBudget}>
        <input type="number" value={upBudget} onChange={(e) => setUpBudget(e.target.value)} />
      </form>
      <form action=""></form>
      {transactions.map((transac, idx) => (
        <p key={idx}>{transac.transac_name} - {transac.category} - {transac.created}</p>
      ))}
    </div>
  )
}
