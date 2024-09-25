import { useState, useCallback } from 'react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface UseToastReturn {
  toasts: Toast[]
  addToast: (message: string, type: ToastType) => void
  removeToast: (id: number) => void
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now(), message, type },
    ])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

// Toast component for rendering individual toasts
export function Toast({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[toast.type]

  return (
    <div className={`${bgColor} text-white p-4 rounded-md shadow-md mb-2 flex justify-between items-center`}>
      <p>{toast.message}</p>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        &times;
      </button>
    </div>
  )
}

// ToastContainer component for managing multiple toasts
export function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}