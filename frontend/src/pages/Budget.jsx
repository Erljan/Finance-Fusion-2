import { useEffect, useState } from "react";
import { api } from "../api";
import { Modal } from "../components/BudgetModal";
import { TransacModal } from "../components/TransactionModal";
import { BudgetChart } from "../components/BudgetChart";

export const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [upBudget, setUpBudget] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [budgetId, setBudgetId] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [addTransacName, setTransacName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const [editTransacName, setEditTransacName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [isTransacModalOpen, setIsTransacModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const categories = ["Food", "Transport", "Entertainment", "Utilities", "Clothing", "Housing", "Insurance", "Other"]

  useEffect(() => {
    fetchTransac();
    getBudget();
    // console.log(isTransacModalOpen)
    
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

  const addTransaction = async (e) => {
    e.preventDefault();

    try {
      await api.post("api/budget/transactions/", {
        transac_name: addTransacName,
        category: category,
        amount: amount,
      });
      fetchTransac();
      getBudget();
      setAmount(0);
      setCategory("");
      setTransacName("");
    } catch (error) {
      console.log(error);
    }
  };

  const delTransaction = async (id) => {
    // console.log(`Attempting to delete transaction with ID: ${id}`);
    try {
      await api.delete(`api/budget/transactions/${id}/`);
      fetchTransac();
      getBudget();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTransaction = async (e) => {
    e.preventDefault();

    try {
      await api.put(`api/budget/${selectedTransactionId}/update/transaction/`, {
        transac_name: editTransacName,
        category: editCategory,
        amount: editAmount,
      });
      fetchTransac();
      getBudget();
      setIsTransacModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBudget = async () => {
    try {
      const response = await api.get("api/budget/");
      setBudget(response.data[0].budgetAmt);
      setBudgetId(response.data[0].id);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addBudget = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("api/budget/", { budgetAmt: newBudget });
      setBudget(response.data.budgetAmt);
      setIsModalOpen(false);

      getBudget();
    } catch (error) {
      console.log(error);
    }
  };

  const updateBudget = async (e) => {
    e.preventDefault();
    try {
      await api.put(`api/budget/${budgetId}/`, { budgetAmt: upBudget });
      // setBudget(response.data[0].budgetAmt)
      setBudget(upBudget);
      getBudget();
      // console.log(budget)
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    if (budget === 0) {
      setModalTitle("Add Budget");
      setIsModalOpen(!isModalOpen);
    } else {
      setModalTitle("Edit Budget");
      setUpBudget(budget);
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleTransacModal = (transac) => {
    setIsTransacModalOpen(true);
    setEditTransacName(transac.transac_name);
    setEditCategory(transac.category);
    setEditAmount(transac.amount);
    setSelectedTransactionId(transac.id);
  };

  return (
    <div className="budget-container">
      <div className="transaction-container">
        {/* ========Add/edit transaction========= */}
        <div className="transac-head">
          <h1>You have ${budget}</h1>

          <button onClick={handleOpenModal}>
            {budget === 0 ? "Add Budget" : "Edit Budget"}
          </button>

          {/* =========Modal for add/edit budget======== */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={budget === 0 ? addBudget : updateBudget}
            value={budget === 0 ? newBudget : upBudget}
            onChange={(e) =>
              budget === 0
                ? setNewBudget(e.target.value)
                : setUpBudget(e.target.value)
            }
            title={modalTitle}
          />
        </div>

        {/* ======Add transaction====== */}
        <div className="add-transac">
          <h3>Add Transaction</h3>
          <form action="" onSubmit={(e) => {
                e.preventDefault()
                if((amount - 0.00) > budget){
                  alert("You don't have enough funds")
                } else{
                  addTransaction(e)
                }}} className="transac-form">
            <input
              type="text"
              value={addTransacName}
              onChange={(e) => setTransacName(e.target.value)}
              placeholder="Title"
              className="input-transac"
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-transac">
              <option value="" disabled>Select Category</option>
            {categories.map((cat,idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-transac amount"
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* =======List of transactions======== */}
        <div className="transac-list">
          {transactions.map((transac, idx) => (
            <div key={idx} className="transac-item">
              <h5 className="subtract-transac">- ${transac.amount}</h5>
              <p className="transac-values">{transac.transac_name} <span>{transac.category}</span> <span>{transac.created}</span></p>
              {/* <p>{transac.category}</p>
              <p>{transac.created}</p> */}
              <button onClick={() => delTransaction(transac.id)} className="remove-transac">Delete</button>
              <button onClick={() => handleTransacModal(transac)} className="edit-transac">Edit</button>
              {/* <hr /> */}
            </div>
          ))}

          {isTransacModalOpen && (
            <TransacModal
              isOpen={isTransacModalOpen}
              onClose={() => setIsTransacModalOpen(false)}
              onSubmit={updateTransaction}
              transacName={editTransacName}
              category={editCategory}
              amount={editAmount}
              onTransacNameChange={(e) => setEditTransacName(e.target.value)}
              onCategoryChange={(e) => setEditCategory(e.target.value)}
              onAmountChange={(e) => setEditAmount(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* ========Budget Chart======== */}
      <div className="budget-chart">
        <h3>Transactions</h3>
        {transactions ? (
          <BudgetChart transactions={transactions} width={"100%"} height={1} />
        ) : null}
      </div>
    </div>
  );
};
