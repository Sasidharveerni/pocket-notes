import React from 'react'

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>

      <button onClick={onClose}
      style={{
        background: 'none',
        border: 'none',
        float: 'right',
        margin: '1rem',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bolder'
      }}
      >X</button>

      {children}
      

      

    </div>
  </div>
  )
}

export default Modal