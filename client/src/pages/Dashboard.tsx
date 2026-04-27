/**
 * SGPD - Dashboard (Acessível)
 * Design: Modernismo Corporativo - WCAG 2.1 AA
 * Componentes: EnhancedSidebar, EnhancedHeader, PageHeader, Breadcrumb
 */

import React, { useState } from 'react';
import {
  EnhancedSidebar,
  EnhancedHeader,
  PageHeader,
  MainContent,
  Breadcrumb,
  NavigationLink,
} from '@/components/Navigation';
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  Table,
  KPICard,
} from '@/components/SGPDComponents';
import { BarChart3, FileText, Plus, Eye } from 'lucide-react';

interface DashboardPageProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function DashboardPage({ onNavigate, onLogout }: DashboardPageProps) {
  const [activeNav, setActiveNav] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard', badge: 0 },
    { id: 'requests', icon: <FileText size={20} />, label: 'Solicitações', badge: 3 },
    { id: 'new', icon: <Plus size={20} />, label: 'Nova Solicitação', badge: 0 },
    { id: 'reports', icon: <BarChart3 size={20} />, label: 'Relatórios', badge: 0 },
  ];

  const handleNavigation = (id: string) => {
    setActiveNav(id);
    if (id === 'new') {
      onNavigate?.('new-request');
    } else if (id === 'requests') {
      onNavigate?.('list');
    } else if (id === 'dashboard') {
      onNavigate?.('dashboard');
    }
  };

  // Mock data
  const recentRequests = [
    {
      id: 'REQ-001',
      title: 'Implementar novo módulo de relatórios',
      status: 'in-progress',
      date: '2026-04-23',
      priority: 'Alta',
    },
    {
      id: 'REQ-002',
      title: 'Corrigir bug no sistema de login',
      status: 'completed',
      date: '2026-04-22',
      priority: 'Crítica',
    },
    {
      id: 'REQ-003',
      title: 'Atualizar documentação do API',
      status: 'pending',
      date: '2026-04-21',
      priority: 'Média',
    },
    {
      id: 'REQ-004',
      title: 'Melhorar performance do dashboard',
      status: 'pending',
      date: '2026-04-20',
      priority: 'Média',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'in-progress': <Badge status="info">Em Progresso</Badge>,
      completed: <Badge status="success">Concluído</Badge>,
      pending: <Badge status="warning">Pendente</Badge>,
      rejected: <Badge status="error">Rejeitado</Badge>,
    };
    return statusMap[status as keyof typeof statusMap] || <Badge status="info">{status}</Badge>;
  };

  const breadcrumbs = [
    { label: 'Home', onClick: () => onNavigate?.('dashboard') },
    { label: 'Dashboard', current: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <EnhancedSidebar
        items={sidebarItems}
        activeItem={activeNav}
        onItemClick={handleNavigation}
        footer={
          <button
            onClick={onLogout}
            className="w-full text-left text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          >
            Sair
          </button>
        }
      />

      {/* Main Content */}
      <MainContent hasSidebar={true}>
        {/* Header */}
        <EnhancedHeader
          userName="João Silva"
          notifications={3}
          onNotificationClick={() => alert('Notificações')}
          title="Dashboard"
        />

        {/* Page Content */}
        <div className="p-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbs} />

          {/* Page Header */}
          <PageHeader
            title="Dashboard"
            description="Bem-vindo ao SGPD. Aqui está um resumo das suas atividades."
            actions={
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate?.('new-request')}
              >
                + Nova Solicitação
              </Button>
            }
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KPICard
              label="Solicitações Ativas"
              value="12"
              change="3"
              icon="📋"
            />
            <KPICard
              label="Concluídas este mês"
              value="28"
              change="12"
              icon="✅"
            />
            <KPICard
              label="Tempo médio (dias)"
              value="4.2"
              change="-0.8"
              icon="⏱️"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Simple Chart */}
            <Card className="hover-lift">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Solicitações por Mês</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'Janeiro', value: 24, width: '60%' },
                    { month: 'Fevereiro', value: 32, width: '80%' },
                    { month: 'Março', value: 28, width: '70%' },
                    { month: 'Abril', value: 35, width: '87%' },
                  ].map((item) => (
                    <div key={item.month}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.month}</span>
                        <span className="text-sm text-gray-600">{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: item.width }}
                          role="progressbar"
                          aria-valuenow={parseInt(item.width)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${item.month}: ${item.value} solicitações`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card className="hover-lift">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Distribuição de Status</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Concluído', value: 45, color: 'bg-green-500' },
                    { label: 'Em Progresso', value: 30, color: 'bg-blue-500' },
                    { label: 'Pendente', value: 20, color: 'bg-yellow-500' },
                    { label: 'Rejeitado', value: 5, color: 'bg-red-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${item.color}`}
                        aria-hidden="true"
                      ></div>
                      <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests */}
          <Card className="hover-lift">
            <CardHeader className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Solicitações Recentes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('list')}
              >
                Ver todas →
              </Button>
            </CardHeader>
            <CardContent>
              <Table
                columns={[
                  { key: 'id', label: 'ID', width: 'w-20' },
                  { key: 'title', label: 'Título' },
                  { key: 'status', label: 'Status', width: 'w-32' },
                  { key: 'priority', label: 'Prioridade', width: 'w-24' },
                  { key: 'date', label: 'Data', width: 'w-24' },
                  { key: 'action', label: '', width: 'w-12' },
                ]}
                data={recentRequests.map((req) => ({
                  id: req.id,
                  title: req.title,
                  status: getStatusBadge(req.status),
                  priority: (
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        req.priority === 'Crítica'
                          ? 'bg-red-100 text-red-800'
                          : req.priority === 'Alta'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {req.priority}
                    </span>
                  ),
                  date: req.date,
                  action: (
                    <button
                      onClick={() => onNavigate?.('details')}
                      className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                      aria-label={`Ver detalhes de ${req.id}`}
                    >
                      <Eye size={18} aria-hidden="true" />
                    </button>
                  ),
                }))}
                onRowClick={(row) => onNavigate?.('details')}
              />
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  );
}
