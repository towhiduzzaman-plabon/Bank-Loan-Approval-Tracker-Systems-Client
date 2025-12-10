import React, { useState, useEffect } from "react";


const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <dialog open className="modal modal-open" onClose={onClose}>
      <div className="modal-box">
        {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
        <div>{children}</div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
