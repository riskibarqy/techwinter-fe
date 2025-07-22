// Simple toast notification system
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

class ToastManager {
  private container: HTMLElement | null = null;

  private createContainer() {
    if (this.container) return this.container;

    this.container = document.createElement('div');
    this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(this.container);
    return this.container;
  }

  private createToast(message: string, type: ToastType, options: ToastOptions = {}) {
    const container = this.createContainer();
    const toast = document.createElement('div');
    
    const baseClasses = 'px-4 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 translate-x-full opacity-0';
    const typeClasses = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    };

    toast.className = `${baseClasses} ${typeClasses[type]}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
    });

    // Auto remove
    const duration = options.duration || 3000;
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  success(message: string, options?: ToastOptions) {
    this.createToast(message, 'success', options);
  }

  error(message: string, options?: ToastOptions) {
    this.createToast(message, 'error', options);
  }

  warning(message: string, options?: ToastOptions) {
    this.createToast(message, 'warning', options);
  }

  info(message: string, options?: ToastOptions) {
    this.createToast(message, 'info', options);
  }
}

export const toast = new ToastManager();