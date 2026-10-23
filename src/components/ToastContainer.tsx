import React from 'react';
import { useToast } from '../context/ToastContext';
import ToastComponent from './Toast';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      {toasts.map(toast => (
        <ToastComponent key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;