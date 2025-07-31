import { toast } from 'react-toastify';

// Track active toasts to prevent duplicates
const activeToasts = new Set();

// Cleanup timeout for each toast
const toastCleanupTimeouts = new Map();

const createUniqueToast = (message, type = 'default', options = {}) => {
  // Create a unique key for this toast
  const toastKey = `${type}:${message}`;
  
  // If this exact toast is already active, don't show it again
  if (activeToasts.has(toastKey)) {
    return null;
  }
  
  // Add to active toasts
  activeToasts.add(toastKey);
  
  // Default options
  const defaultOptions = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClose: () => {
      // Remove from active toasts when closed
      activeToasts.delete(toastKey);
      // Clear any pending cleanup timeout
      if (toastCleanupTimeouts.has(toastKey)) {
        clearTimeout(toastCleanupTimeouts.get(toastKey));
        toastCleanupTimeouts.delete(toastKey);
      }
    }
  };
  
  // Merge options
  const finalOptions = { ...defaultOptions, ...options };
  
  // Show the toast
  let toastId;
  switch (type) {
    case 'success':
      toastId = toast.success(message, finalOptions);
      break;
    case 'error':
      toastId = toast.error(message, finalOptions);
      break;
    case 'warning':
      toastId = toast.warning(message, finalOptions);
      break;
    case 'info':
      toastId = toast.info(message, finalOptions);
      break;
    default:
      toastId = toast(message, finalOptions);
      break;
  }
  
  // Set up cleanup timeout as a fallback
  const cleanupTimeout = setTimeout(() => {
    activeToasts.delete(toastKey);
    toastCleanupTimeouts.delete(toastKey);
  }, finalOptions.autoClose + 1000); // Add extra buffer time
  
  toastCleanupTimeouts.set(toastKey, cleanupTimeout);
  
  return toastId;
};

// Export convenient methods
export const showToast = {
  success: (message, options) => createUniqueToast(message, 'success', options),
  error: (message, options) => createUniqueToast(message, 'error', options),
  warning: (message, options) => createUniqueToast(message, 'warning', options),
  info: (message, options) => createUniqueToast(message, 'info', options),
  default: (message, options) => createUniqueToast(message, 'default', options)
};

// Force clear all active toasts (useful for testing)
export const clearAllToasts = () => {
  activeToasts.clear();
  toastCleanupTimeouts.forEach(timeout => clearTimeout(timeout));
  toastCleanupTimeouts.clear();
  toast.dismiss();
};

export default showToast;
