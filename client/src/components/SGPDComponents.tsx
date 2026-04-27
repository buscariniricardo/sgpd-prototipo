/**
 * SGPD Design System Components
 * Modernismo Corporativo - Componentes reutilizáveis para o protótipo
 */

import React from 'react';
import { ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// ============ BUTTON ============
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-800 active:scale-95 disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 disabled:bg-gray-100',
    ghost: 'text-gray-900 hover:bg-gray-100 disabled:text-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-800 active:scale-95 disabled:bg-gray-400',
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
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin mr-2">⟳</span>
      ) : null}
      {children}
    </button>
  );
};

// ============ INPUT ============
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

// ============ CARD ============
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`px-6 py-4 ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-6 py-4 border-t border-gray-200 flex justify-end gap-2 ${className}`}>
    {children}
  </div>
);

// ============ BADGE ============
interface BadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const statusClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClasses[status]}`}>
      {children}
    </span>
  );
};

// ============ STATUS BADGE WITH ICON ============
interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'in-progress';
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const config = {
    approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    rejected: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
    'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock },
  };
  
  const { color, icon: Icon } = config[status];
  
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${color}`}>
      <Icon size={16} />
      {label}
    </div>
  );
};

// ============ SIDEBAR ============
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export const Sidebar: React.FC<{
  items: Array<{ id: string; icon: React.ReactNode; label: string }>;
  activeItem?: string;
  onItemClick?: (id: string) => void;
}> = ({ items, activeItem, onItemClick }) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto">
      {/* Logo/Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">SGPD</h1>
        <p className="text-xs text-gray-500 mt-1">Sistema de Gestão</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </nav>
    </div>
  );
};

// ============ HEADER ============
export const Header: React.FC<{
  userName?: string;
  notifications?: number;
  onNotificationClick?: () => void;
}> = ({ userName = 'Usuário', notifications = 0, onNotificationClick }) => {
  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <div className="flex items-center gap-4">
          {notifications > 0 && (
            <button
              onClick={onNotificationClick}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
          )}
          <div className="text-sm text-gray-700 font-medium">{userName}</div>
        </div>
      </div>
    </div>
  );
};

// ============ KPI CARD ============
interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, change, icon }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-xs text-green-600 mt-2">
              ↑ {change} vs. mês anterior
            </p>
          )}
        </div>
        {icon && (
          <div className="text-3xl text-blue-600 opacity-20">{icon}</div>
        )}
      </div>
    </Card>
  );
};

// ============ STEP FORM ============
interface StepFormProps {
  steps: Array<{ id: string; label: string }>;
  currentStep: number;
  onStepChange?: (step: number) => void;
  children: React.ReactNode;
}

export const StepForm: React.FC<StepFormProps> = ({
  steps,
  currentStep,
  onStepChange,
  children,
}) => {
  return (
    <div>
      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => onStepChange?.(index)}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
            <div className="flex-1 ml-4">
              <p className="text-sm font-medium text-gray-900">{step.label}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-4 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="mt-8">{children}</div>
    </div>
  );
};

// ============ TIMELINE ============
interface TimelineEventProps {
  title: string;
  description?: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  icon?: React.ReactNode;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  title,
  description,
  timestamp,
  status,
  icon,
}) => {
  const statusColor = {
    completed: 'bg-green-100 text-green-800',
    current: 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800',
  };
  
  return (
    <div className="flex gap-4 pb-8">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold ${statusColor[status]}`}>
        {icon || (status === 'completed' ? '✓' : status === 'current' ? '●' : '○')}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
      </div>
    </div>
  );
};

export const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ============ COMMENT SECTION ============
interface CommentProps {
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
}

export const Comment: React.FC<CommentProps> = ({
  author,
  avatar,
  timestamp,
  content,
}) => {
  return (
    <div className="flex gap-4 pb-6">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        {avatar || author.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-900">{author}</h4>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-700 mt-2">{content}</p>
      </div>
    </div>
  );
};

export const CommentSection: React.FC<{
  comments: CommentProps[];
  onAddComment?: (comment: string) => void;
}> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = React.useState('');
  
  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment);
      setNewComment('');
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
      
      {/* Add Comment */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            V
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!newComment.trim()}
              >
                Comentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ TABLE ============
interface TableProps {
  columns: Array<{ key: string; label: string; width?: string }>;
  data: Array<Record<string, any>>;
  onRowClick?: (row: Record<string, any>) => void;
}

export const Table: React.FC<TableProps> = ({ columns, data, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-900 ${
                  col.width || ''
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-900">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============ SEARCH & FILTER ============
export const SearchBar: React.FC<{
  placeholder?: string;
  onSearch?: (query: string) => void;
}> = ({ placeholder = 'Buscar...', onSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
};

export const FilterButton: React.FC<{
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ label, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};
