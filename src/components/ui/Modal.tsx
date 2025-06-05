import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times text-lg" />
        </button>
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
