"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const iconMap: Record<ToastType, React.ReactNode> = {
    success: <FiCheckCircle size={18} className="text-green-500" />,
    error: <FiAlertCircle size={18} className="text-red-500" />,
    info: <FiInfo size={18} className="text-blue-500" />,
  };

  const bgMap: Record<ToastType, string> = {
    success:
      "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    error:
      "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800",
    info:
      "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-sm transition-all animate-slideIn ${bgMap[toast.type]}`}
          >
            {iconMap[toast.type]}
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
