import React from "react";

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Modal content goes here */}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
