import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, closeModal }) {
  return (
    <div className={`modal-overlay ${isOpen ? "show-modal" : ""}`}>
      <div className="modal-container">
        
        {/* Close Button */}
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>

        {/* Modal Content */}
        <h3>Modal Title</h3>
        <p>This is a simple reusable modal component.</p>

      </div>
    </div>
  );
}