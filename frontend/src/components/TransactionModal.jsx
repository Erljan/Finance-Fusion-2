

export const TransacModal = ({ isOpen, onClose, onSubmit, transacName, category, amount, onTransacNameChange, onCategoryChange, onAmountChange }) => {
  if (!isOpen) return null; // If isOpen is false, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Transaction</h2>
        <form onSubmit={onSubmit} className="add-transac">
          <input type="text" value={transacName} onChange={onTransacNameChange} placeholder="Transaction Name" />
          <input type="text" value={category} onChange={onCategoryChange} placeholder="Category" />
          <input type="number" value={amount} onChange={onAmountChange} placeholder="Amount" />
          <button type="submit" >Update</button>
        </form>
        <button onClick={onClose} className="remove-transac">Cancel</button>
      </div>
    </div>
  );
};