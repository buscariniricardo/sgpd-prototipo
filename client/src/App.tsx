import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useState } from "react";

// Import pages
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import NewRequestPage from "./pages/NewRequest";
import ListRequestsPage from "./pages/ListRequests";
import RequestDetailsPage from "./pages/RequestDetails";

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // If not logged in, show login
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // After login, show navigation-based pages
  switch (currentPage) {
    case 'dashboard':
      return <DashboardPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    case 'new-request':
      return <NewRequestPage onNavigate={handleNavigate} />;
    case 'list':
      return <ListRequestsPage onNavigate={handleNavigate} />;
    case 'details':
      return <RequestDetailsPage onNavigate={handleNavigate} />;
    default:
      return <DashboardPage onNavigate={handleNavigate} onLogout={handleLogout} />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
