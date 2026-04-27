/**
 * SGPD - Detalhes da Solicitação
 * Design: Modernismo Corporativo - Timeline, Status, Comentários
 */

import React, { useState } from 'react';
import {
  Sidebar,
  Header,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Button,
  StatusBadge,
  Timeline,
  TimelineEvent,
  CommentSection,
} from '@/components/SGPDComponents';
import { BarChart3, FileText, Plus, ArrowLeft, Edit2 } from 'lucide-react';

interface RequestDetailsPageProps {
  onNavigate?: (page: string) => void;
}

export default function RequestDetailsPage({ onNavigate }: RequestDetailsPageProps) {
  const [activeNav, setActiveNav] = useState('requests');
  const [comments, setComments] = useState([
    {
      author: 'Ana Costa',
      timestamp: '2026-04-23 10:30',
      content: 'Iniciamos o desenvolvimento desta funcionalidade. Estimativa de conclusão: 5 dias.',
    },
    {
      author: 'João Silva',
      timestamp: '2026-04-22 14:15',
      content: 'Solicitação aprovada. Prioridade confirmada como Alta.',
    },
  ]);

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
    } else if (id === 'requests') {
      onNavigate?.('list');
    } else if (id === 'new') {
      onNavigate?.('new-request');
    }
  };

  const handleAddComment = (comment: string) => {
    const now = new Date();
    const timestamp = now.toLocaleString('pt-BR');
    setComments([
      ...comments,
      {
        author: 'Você',
        timestamp,
        content: comment,
      },
    ]);
  };

  // Mock data
  const request = {
    id: 'REQ-001',
    title: 'Implementar novo módulo de relatórios',
    status: 'in-progress',
    priority: 'Alta',
    date: '2026-04-23',
    assignee: 'Carlos Silva',
    description:
      'Desenvolvimento de um novo módulo para gerar relatórios personalizados com filtros avançados, exportação em PDF e Excel, e agendamento de envio automático.',
    deadline: '2026-05-10',
    category: 'Desenvolvimento',
    attachments: ['Requisitos.pdf', 'Mockups.figma'],
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
            onClick={() => onNavigate?.('list')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ArrowLeft size={18} />
            Voltar para Lista
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{request.title}</h1>
                      <p className="text-gray-600">{request.id}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      <Edit2 size={16} className="mr-2" />
                      Editar
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <StatusBadge status="in-progress" label="Em Progresso" />
                    <Badge status="warning">Prioridade Alta</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Descrição</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{request.description}</p>
                </CardContent>
              </Card>

              {/* Details */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Informações</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Categoria</p>
                      <p className="text-gray-900 mt-1">{request.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Responsável</p>
                      <p className="text-gray-900 mt-1">{request.assignee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Data de Criação</p>
                      <p className="text-gray-900 mt-1">{request.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Prazo</p>
                      <p className="text-gray-900 mt-1">{request.deadline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Linha do Tempo</h3>
                </CardHeader>
                <CardContent>
                  <Timeline>
                    <TimelineEvent
                      title="Solicitação Criada"
                      description="Solicitação foi criada no sistema"
                      timestamp="2026-04-23 09:00"
                      status="completed"
                    />
                    <TimelineEvent
                      title="Aprovação Pendente"
                      description="Aguardando aprovação do gerente"
                      timestamp="2026-04-23 10:00"
                      status="completed"
                    />
                    <TimelineEvent
                      title="Desenvolvimento Iniciado"
                      description="Equipe iniciou o desenvolvimento"
                      timestamp="2026-04-23 11:30"
                      status="current"
                    />
                    <TimelineEvent
                      title="Revisão de Código"
                      description="Aguardando revisão de código"
                      timestamp="2026-05-05 (estimado)"
                      status="pending"
                    />
                    <TimelineEvent
                      title="Teste e QA"
                      description="Fase de testes"
                      timestamp="2026-05-08 (estimado)"
                      status="pending"
                    />
                    <TimelineEvent
                      title="Conclusão"
                      description="Solicitação concluída e deployada"
                      timestamp="2026-05-10 (estimado)"
                      status="pending"
                    />
                  </Timeline>
                </CardContent>
              </Card>

              {/* Comments */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Comentários</h3>
                </CardHeader>
                <CardContent>
                  <CommentSection
                    comments={comments}
                    onAddComment={handleAddComment}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-2">Estado Atual</p>
                      <StatusBadge status="in-progress" label="Em Progresso" />
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 font-medium mb-2">Progresso</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">60% concluído</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Anexos</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {request.attachments.map((file, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-blue-600 hover:text-blue-700"
                      >
                        <span>📎</span>
                        <span className="text-sm">{file}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Button variant="primary" className="w-full">
                      Atualizar Status
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Atribuir a Mim
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Mais Opções
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
