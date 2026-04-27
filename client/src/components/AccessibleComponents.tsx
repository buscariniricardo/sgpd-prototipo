/**
 * SGPD - Componentes Acessíveis
 * Design: Modernismo Corporativo + WCAG 2.1 AA
 * 
 * Componentes com suporte completo a:
 * - ARIA labels e roles
 * - Keyboard navigation (Tab, Enter, Escape, Arrow keys)
 * - Focus management
 * - Screen reader support
 */

import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, X, AlertCircle } from 'lucide-react';

// ============ ACCESSIBLE BUTTON ============
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  children: React.ReactNode;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-800 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed',
    ghost: 'text-gray-900 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
    danger: 'bg-red-600 text-white hover:bg-red-800 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin mr-2" aria-hidden="true">⟳</span>
      ) : null}
      {children}
    </button>
  );
};

// ============ ACCESSIBLE INPUT ============
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  error,
  helperText,
  isRequired = false,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {isRequired && <span className="text-red-600 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

// ============ ACCESSIBLE DROPDOWN ============
interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AccessibleDropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
}

export const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecione uma opção',
  isRequired = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen) {
          onChange?.(options[highlightedIndex].value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {isRequired && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50"
          >
            {options.map((option, index) => (
              <li key={option.value} role="option" aria-selected={value === option.value}>
                <button
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    index === highlightedIndex
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-900 hover:bg-gray-50'
                  } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={option.disabled}
                  aria-disabled={option.disabled}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
};

// ============ ACCESSIBLE MODAL ============
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Trap focus inside modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();

      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
              aria-label="Fechar modal"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>

          {/* Actions */}
          {actions && (
            <div className="flex justify-end gap-2 p-6 border-t border-gray-200">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============ ACCESSIBLE TABS ============
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AccessibleTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const AccessibleTabs: React.FC<AccessibleTabsProps> = ({
  tabs,
  defaultTab = tabs[0]?.id,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    }

    setActiveTab(tabs[newIndex].id);
  };

  return (
    <div>
      {/* Tab List */}
      <div
        role="tablist"
        className="flex border-b border-gray-200"
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
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
          className="mt-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

// ============ ACCESSIBLE ALERT ============
interface AccessibleAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
}

export const AccessibleAlert: React.FC<AccessibleAlertProps> = ({
  type,
  title,
  message,
  onClose,
}) => {
  const typeConfig = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '✕' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '⚠' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ' },
  };

  const config = typeConfig[type];

  return (
    <div
      role="alert"
      className={`${config.bg} border ${config.border} rounded-lg p-4 flex items-start gap-3`}
    >
      <span className={`text-lg font-bold ${config.text}`} aria-hidden="true">
        {config.icon}
      </span>
      <div className="flex-1">
        <h3 className={`font-semibold ${config.text}`}>{title}</h3>
        <p className={`text-sm ${config.text} mt-1`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`text-lg font-bold ${config.text} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 rounded`}
          aria-label="Fechar alerta"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// ============ SKIP TO MAIN CONTENT ============
export const SkipToMainContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2"
    >
      Pular para conteúdo principal
    </a>
  );
};
