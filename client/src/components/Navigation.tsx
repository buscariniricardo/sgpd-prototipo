/**
 * SGPD - Sistema de Navegação
 * Breadcrumbs, navegação entre telas, gerenciamento de estado
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

// ============ BREADCRUMB ============
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight size={16} className="text-gray-400" aria-hidden="true" />
          )}
          {item.current ? (
            <span
              className="text-gray-900 font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// ============ PAGE HEADER ============
interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
}) => {
  return (
    <div className="mb-8">
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-gray-600 mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

// ============ NAVIGATION CONTEXT ============
export interface NavigationState {
  currentPage: string;
  previousPage?: string;
  breadcrumbs: BreadcrumbItem[];
}

export interface NavigationContextType {
  state: NavigationState;
  navigate: (page: string, breadcrumbs?: BreadcrumbItem[]) => void;
  goBack: () => void;
}

export const NavigationContext = React.createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation deve ser usado dentro de NavigationProvider');
  }
  return context;
};

// ============ NAVIGATION PROVIDER ============
interface NavigationProviderProps {
  children: React.ReactNode;
  initialPage?: string;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
  initialPage = 'dashboard',
}) => {
  const [state, setState] = React.useState<NavigationState>({
    currentPage: initialPage,
    breadcrumbs: [{ label: 'Dashboard', current: true }],
  });

  const navigate = (page: string, breadcrumbs?: BreadcrumbItem[]) => {
    setState((prev) => ({
      previousPage: prev.currentPage,
      currentPage: page,
      breadcrumbs: breadcrumbs || [{ label: page, current: true }],
    }));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (state.previousPage) {
      setState((prev) => ({
        ...prev,
        currentPage: prev.previousPage || 'dashboard',
        previousPage: undefined,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const value: NavigationContextType = {
    state,
    navigate,
    goBack,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// ============ NAVIGATION LINK ============
interface NavigationLinkProps {
  page: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  className?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  page,
  breadcrumbs,
  children,
  className = '',
}) => {
  const { navigate } = useNavigation();

  return (
    <button
      onClick={() => navigate(page, breadcrumbs)}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 ${className}`}
    >
      {children}
    </button>
  );
};

// ============ BACK BUTTON ============
interface BackButtonProps {
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Voltar',
  className = '',
}) => {
  const { goBack } = useNavigation();

  return (
    <button
      onClick={goBack}
      className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${className}`}
    >
      ← {label}
    </button>
  );
};

// ============ ACTIVE NAV ITEM ============
interface NavItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
}

export const NavItem: React.FC<NavItemProps> = ({
  id,
  icon,
  label,
  isActive = false,
  onClick,
  badge,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset relative ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
            isActive
              ? 'bg-white text-blue-600'
              : 'bg-red-600 text-white'
          }`}
          aria-label={`${badge} novos itens`}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

// ============ ENHANCED SIDEBAR ============
interface SidebarItemConfig {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

interface EnhancedSidebarProps {
  items: SidebarItemConfig[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  logo,
  footer,
}) => {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto flex flex-col"
      role="navigation"
      aria-label="Navegação principal"
    >
      {/* Logo/Header */}
      {logo ? (
        <div className="px-6 py-6 border-b border-gray-200">
          {logo}
        </div>
      ) : (
        <div className="px-6 py-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">SGPD</h1>
          <p className="text-xs text-gray-500 mt-1">Sistema de Gestão</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {items.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => onItemClick?.(item.id)}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="border-t border-gray-200 p-4">
          {footer}
        </div>
      )}
    </aside>
  );
};

// ============ MAIN CONTENT WRAPPER ============
interface MainContentProps {
  children: React.ReactNode;
  hasSidebar?: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  hasSidebar = true,
}) => {
  return (
    <main
      id="main-content"
      className={`min-h-screen bg-gray-50 ${hasSidebar ? 'ml-64' : ''}`}
    >
      {children}
    </main>
  );
};

// ============ ENHANCED HEADER ============
interface EnhancedHeaderProps {
  userName?: string;
  notifications?: number;
  onNotificationClick?: () => void;
  onLogout?: () => void;
  title?: string;
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  userName = 'Usuário',
  notifications = 0,
  onNotificationClick,
  onLogout,
  title,
}) => {
  return (
    <header
      className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm"
      role="banner"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {title && (
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        )}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          {notifications > 0 && (
            <button
              onClick={onNotificationClick}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`${notifications} notificações`}
            >
              <span aria-hidden="true">🔔</span>
              <span
                className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"
                aria-hidden="true"
              ></span>
            </button>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-sm text-gray-700 font-medium">{userName}</div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
