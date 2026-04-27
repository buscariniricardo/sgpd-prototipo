/**
 * SGPD - Componentes Avançados
 * Modal, Dropdown, Tabs, Pagination com animações e transições
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// ============ ANIMATED MODAL ============
interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  actions?: React.ReactNode;
}

export const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  actions,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop com fade */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal com slide-up */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-slide-up"
      >
        <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-colors"
              aria-label="Fechar modal"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

          {/* Actions */}
          {actions && (
            <div className="flex justify-end gap-2 p-6 border-t border-gray-200 bg-gray-50">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============ ADVANCED DROPDOWN ============
interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface AdvancedDropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect?: (value: string) => void;
  placement?: 'left' | 'right' | 'center';
}

export const AdvancedDropdown: React.FC<AdvancedDropdownProps> = ({
  trigger,
  options,
  onSelect,
  placement = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const placementClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${placementClasses[placement]} w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in`}
          role="menu"
        >
          {options.map((option, index) => (
            option.divider ? (
              <div key={index} className="border-t border-gray-200" />
            ) : (
              <button
                key={option.value}
                onClick={() => {
                  onSelect?.(option.value);
                  setIsOpen(false);
                }}
                disabled={option.disabled}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                  option.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
                role="menuitem"
              >
                {option.icon && <span className="text-lg">{option.icon}</span>}
                {option.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

// ============ ANIMATED TABS ============
interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  defaultTab = tabs[0]?.id,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        onChange?.(tabId);
        setIsTransitioning(false);
      }, 150);
    }
  };

  return (
    <div>
      {/* Tab List */}
      <div
        role="tablist"
        className="flex border-b border-gray-200 overflow-x-auto"
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={activeTab !== tab.id}
          className={`mt-4 transition-opacity duration-200 ${
            isTransitioning ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

// ============ PAGINATION ============
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Próxima página"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      {/* Info */}
      <span className="ml-4 text-sm text-gray-600">
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>
    </div>
  );
};

// ============ TOAST NOTIFICATION ============
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '✕' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '⚠' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ' },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-lg p-4 flex items-start gap-3 animate-slide-up shadow-lg`}
      role="alert"
    >
      <span className={`text-lg font-bold ${config.text} flex-shrink-0`} aria-hidden="true">
        {config.icon}
      </span>
      <div className="flex-1">
        <h3 className={`font-semibold ${config.text}`}>{title}</h3>
        <p className={`text-sm ${config.text} mt-1`}>{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`text-lg font-bold ${config.text} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 rounded flex-shrink-0`}
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </div>
  );
};

// ============ TOAST CONTAINER ============
interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

// ============ TOAST HOOK ============
export const useToast = () => {
  const [toasts, setToasts] = React.useState<Array<ToastProps & { id: string }>>([]);

  const addToast = (toast: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};
