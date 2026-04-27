/**
 * SGPD - Lista de Solicitações
 * Design: Modernismo Corporativo - Busca, filtros, status com cores
 */

import React, { useState, useMemo } from 'react';
import {
  Sidebar,
  Header,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  SearchBar,
  FilterButton,
  Table,
} from '@/components/SGPDComponents';
import { BarChart3, FileText, Plus, Eye, ArrowLeft } from 'lucide-react';

interface ListRequestsPageProps {
  onNavigate?: (page: string) => void;
}

export default function ListRequestsPage({ onNavigate }: ListRequestsPageProps) {
  const [activeNav, setActiveNav] = useState('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const sidebarItems = [
    { id: 'dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { id: 'requests', icon: <FileText size={20} />, label: 'Solicitações' },
    { id: 'new', icon: <Plus size={20} />, label: 'Nova Solicitação' },
    { id: 'reports', icon: <BarChart3 size={20} />, label: 'Relatórios' },
  ];

  const handleNavigation = (id: string) => {
    setActiveNav(id);
    if (id === 'dashboard') {
      onNavigate?.('dashboard');
    } else if (id === 'new') {
      onNavigate?.('new-request');
    }
  };

  // Mock data
  const allRequests = [
    {
      id: 'REQ-001',
      title: 'Implementar novo módulo de relatórios',
      status: 'in-progress',
      priority: 'Alta',
      date: '2026-04-23',
      assignee: 'Carlos Silva',
      description: 'Desenvolvimento de novo módulo para gerar relatórios personalizados',
    },
    {
      id: 'REQ-002',
      title: 'Corrigir bug no sistema de login',
      status: 'completed',
      priority: 'Crítica',
      date: '2026-04-22',
      assignee: 'Ana Costa',
      description: 'Usuários não conseguem fazer login com 2FA',
    },
    {
      id: 'REQ-003',
      title: 'Atualizar documentação do API',
      status: 'pending',
      priority: 'Média',
      date: '2026-04-21',
      assignee: 'Pedro Santos',
      description: 'Documentar novos endpoints da API v2',
    },
    {
      id: 'REQ-004',
      title: 'Melhorar performance do dashboard',
      status: 'pending',
      priority: 'Média',
      date: '2026-04-20',
      assignee: 'João Silva',
      description: 'Dashboard carrega lentamente com muitos dados',
    },
    {
      id: 'REQ-005',
      title: 'Implementar autenticação SSO',
      status: 'in-progress',
      priority: 'Alta',
      date: '2026-04-19',
      assignee: 'Maria Oliveira',
      description: 'Integração com Azure AD para SSO',
    },
    {
      id: 'REQ-006',
      title: 'Backup automático de dados',
      status: 'completed',
      priority: 'Crítica',
      date: '2026-04-18',
      assignee: 'Roberto Costa',
      description: 'Sistema de backup automático diário',
    },
    {
      id: 'REQ-007',
      title: 'Adicionar suporte a múltiplos idiomas',
      status: 'pending',
      priority: 'Baixa',
      date: '2026-04-17',
      assignee: 'Fernanda Lima',
      description: 'Internacionalização da interface',
    },
    {
      id: 'REQ-008',
      title: 'Otimizar consultas de banco de dados',
      status: 'in-progress',
      priority: 'Alta',
      date: '2026-04-16',
      assignee: 'Lucas Martins',
      description: 'Melhorar índices e queries lentas',
    },
  ];

  // Filter and search
  const filteredRequests = useMemo(() => {
    let filtered = allRequests;

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter((req) => req.status === activeFilter);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (req) =>
          req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.assignee.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'priority') {
      const priorityOrder = { 'Crítica': 0, 'Alta': 1, 'Média': 2, 'Baixa': 3 };
      filtered.sort(
        (a, b) =>
          (priorityOrder[a.priority as keyof typeof priorityOrder] || 4) -
          (priorityOrder[b.priority as keyof typeof priorityOrder] || 4)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter, sortBy]);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'in-progress': <Badge status="info">Em Progresso</Badge>,
      completed: <Badge status="success">Concluído</Badge>,
      pending: <Badge status="warning">Pendente</Badge>,
      rejected: <Badge status="error">Rejeitado</Badge>,
    };
    return statusMap[status as keyof typeof statusMap] || <Badge status="info">{status}</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeNav}
        onItemClick={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="João Silva" />

        {/* Content */}
        <div className="p-8">
          {/* Back Button */}
          <button
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Solicitações</h1>
            <p className="text-gray-600 mt-1">Gerencie todas as suas solicitações</p>
          </div>

          {/* Filters Card */}
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Filtros e Busca</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search */}
                <SearchBar
                  placeholder="Buscar por ID, título ou responsável..."
                  onSearch={setSearchQuery}
                />

                {/* Status Filters */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Status</p>
                  <div className="flex flex-wrap gap-2">
                    <FilterButton
                      label="Todos"
                      isActive={activeFilter === 'all'}
                      onClick={() => setActiveFilter('all')}
                    />
                    <FilterButton
                      label="Em Progresso"
                      isActive={activeFilter === 'in-progress'}
                      onClick={() => setActiveFilter('in-progress')}
                    />
                    <FilterButton
                      label="Pendente"
                      isActive={activeFilter === 'pending'}
                      onClick={() => setActiveFilter('pending')}
                    />
                    <FilterButton
                      label="Concluído"
                      isActive={activeFilter === 'completed'}
                      onClick={() => setActiveFilter('completed')}
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Ordenar por</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Data (Recente)</option>
                    <option value="priority">Prioridade</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Resultados ({filteredRequests.length})
                </h3>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate?.('new-request')}
                >
                  + Nova Solicitação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredRequests.length > 0 ? (
                <Table
                  columns={[
                    { key: 'id', label: 'ID', width: 'w-20' },
                    { key: 'title', label: 'Título' },
                    { key: 'status', label: 'Status', width: 'w-32' },
                    { key: 'priority', label: 'Prioridade', width: 'w-24' },
                    { key: 'assignee', label: 'Responsável', width: 'w-32' },
                    { key: 'date', label: 'Data', width: 'w-24' },
                    { key: 'action', label: '', width: 'w-12' },
                  ]}
                  data={filteredRequests.map((req) => ({
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
                            : req.priority === 'Média'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {req.priority}
                      </span>
                    ),
                    assignee: req.assignee,
                    date: req.date,
                    action: (
                      <button
                        onClick={() => onNavigate?.('details')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={18} />
                      </button>
                    ),
                  }))}
                  onRowClick={(row) => onNavigate?.('details')}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Nenhuma solicitação encontrada</p>
                  <p className="text-gray-400 text-sm mt-1">Tente ajustar seus filtros ou criar uma nova</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
