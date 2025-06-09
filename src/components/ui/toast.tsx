import React from 'react';
import { toast, ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  error: (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  info: (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  warning: (message: string) => {
    toast.warning(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

// Toast Container Component
interface ToastProviderProps {
  position?: ToastPosition;
  className?: string;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  position = 'top-right',
  className = ''
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className={className}
      toastClassName="relative flex p-4 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer"
    //   bodyClassName="text-sm font-medium"
      progressClassName="bg-white bg-opacity-20"
      theme="light"
      style={{
        fontSize: '14px',
      }}
    />
  );
};

// Custom hook for easier usage
export const useToast = () => {
  return {
    success: showToast.success,
    error: showToast.error,
    info: showToast.info,
    warning: showToast.warning,
  };
};

export default ToastProvider;