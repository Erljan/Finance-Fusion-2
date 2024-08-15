

export const Modal = ({ isOpen, onClose, onSubmit, value, onChange }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <input
              type="number"
              value={value}
              onChange={onChange}
              placeholder="Enter new "
              min="0" // Ensure non-negative values
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
  };