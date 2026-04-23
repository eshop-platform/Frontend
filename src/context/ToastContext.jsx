/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info
};

const styles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map(({ id, message, type }) => {
          const Icon = icons[type] ?? Info;
          return (
            <div
              key={id}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl text-sm font-medium pointer-events-auto animate-slide-up max-w-sm ${styles[type]}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{message}</span>
              <button onClick={() => remove(id)} className="opacity-60 hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
