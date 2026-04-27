/**
 * SGPD - Nova Solicitação (Acessível)
 * Design: Modernismo Corporativo - WCAG 2.1 AA
 * Componentes: AccessibleInput, AccessibleDropdown, AccessibleButton, StepForm
 */

import React, { useState } from 'react';
import {
  EnhancedSidebar,
  EnhancedHeader,
  PageHeader,
  MainContent,
  Breadcrumb,
  BackButton,
} from '@/components/Navigation';
import {
  AccessibleInput,
  AccessibleDropdown,
  AccessibleButton,
} from '@/components/AccessibleComponents';
import {
  StepForm,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/SGPDComponents';
import { BarChart3, FileText, Plus, ArrowLeft } from 'lucide-react';

interface NewRequestPageProps {
  onNavigate?: (page: string) => void;
}

export default function NewRequestPage({ onNavigate }: NewRequestPageProps) {
  const [activeNav, setActiveNav] = useState('new');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'media',
    assignee: '',
    deadline: '',
    attachments: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 'info', label: 'Informações' },
    { id: 'details', label: 'Detalhes' },
    { id: 'confirm', label: 'Confirmação' },
  ];

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
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
      if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
      if (!formData.category.trim()) newErrors.category = 'Categoria é obrigatória';
    } else if (step === 1) {
      if (!formData.assignee.trim()) newErrors.assignee = 'Responsável é obrigatório';
      if (!formData.deadline) newErrors.deadline = 'Prazo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      alert('Solicitação enviada com sucesso!');
      onNavigate?.('dashboard');
    }
  };

  const breadcrumbs = [
    { label: 'Home', onClick: () => onNavigate?.('dashboard') },
    { label: 'Nova Solicitação', current: true },
  ];

  const priorityOptions = [
    { value: 'baixa', label: 'Baixa' },
    { value: 'media', label: 'Média' },
    { value: 'alta', label: 'Alta' },
    { value: 'critica', label: 'Crítica' },
  ];

  const categoryOptions = [
    { value: 'desenvolvimento', label: 'Desenvolvimento' },
    { value: 'suporte', label: 'Suporte' },
    { value: 'manutencao', label: 'Manutenção' },
    { value: 'documentacao', label: 'Documentação' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <EnhancedSidebar
        items={sidebarItems}
        activeItem={activeNav}
        onItemClick={handleNavigation}
      />

      {/* Main Content */}
      <MainContent hasSidebar={true}>
        {/* Header */}
        <EnhancedHeader userName="João Silva" title="Nova Solicitação" />

        {/* Page Content */}
        <div className="p-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbs} />

          {/* Back Button */}
          <BackButton
            label="Voltar"
            className="mb-6"
          />

          {/* Page Header */}
          <PageHeader
            title="Nova Solicitação"
            description="Preencha os dados abaixo para criar uma nova solicitação"
          />

          {/* Form Card */}
          <Card className="max-w-2xl">
            <CardContent className="pt-8">
              {/* Step Form */}
              <StepForm
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              >
                {/* Step 1: Informações */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <AccessibleInput
                      id="title"
                      label="Título da Solicitação"
                      name="title"
                      placeholder="Ex: Implementar novo módulo"
                      value={formData.title}
                      onChange={handleInputChange}
                      isRequired={true}
                      error={errors.title}
                      helperText="Seja descritivo e conciso"
                    />

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Descrição
                        <span className="text-red-600 ml-1">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Descreva a solicitação em detalhes..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        rows={5}
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? 'description-error' : undefined}
                        required
                      />
                      {errors.description && (
                        <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
                          ⚠️ {errors.description}
                        </p>
                      )}
                    </div>

                    <AccessibleDropdown
                      label="Categoria"
                      options={categoryOptions}
                      value={formData.category}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                      placeholder="Selecione uma categoria"
                      isRequired={true}
                      error={errors.category}
                    />
                  </div>
                )}

                {/* Step 2: Detalhes */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <AccessibleDropdown
                      label="Prioridade"
                      options={priorityOptions}
                      value={formData.priority}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, priority: value }))
                      }
                      placeholder="Selecione a prioridade"
                      isRequired={true}
                    />

                    <AccessibleInput
                      id="assignee"
                      label="Responsável"
                      name="assignee"
                      placeholder="Nome do responsável"
                      value={formData.assignee}
                      onChange={handleInputChange}
                      isRequired={true}
                      error={errors.assignee}
                      helperText="Pessoa responsável pela execução"
                    />

                    <AccessibleInput
                      id="deadline"
                      label="Prazo"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      isRequired={true}
                      error={errors.deadline}
                      helperText="Data de conclusão esperada"
                    />

                    <AccessibleInput
                      id="attachments"
                      label="Anexos (URL)"
                      name="attachments"
                      placeholder="Link para arquivos"
                      value={formData.attachments}
                      onChange={handleInputChange}
                      helperText="Opcional: cole URLs de documentos relevantes"
                    />
                  </div>
                )}

                {/* Step 3: Confirmação */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Resumo da Solicitação
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Título:</span>
                          <span className="text-gray-900">{formData.title || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Categoria:</span>
                          <span className="text-gray-900">{formData.category || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Prioridade:</span>
                          <span className="text-gray-900 capitalize">{formData.priority}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Responsável:</span>
                          <span className="text-gray-900">{formData.assignee || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Prazo:</span>
                          <span className="text-gray-900">{formData.deadline || '-'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800">
                        ✓ Todos os dados foram preenchidos corretamente. Clique em "Enviar" para
                        criar a solicitação.
                      </p>
                    </div>
                  </div>
                )}
              </StepForm>
            </CardContent>

            {/* Footer with Navigation */}
            <CardFooter className="flex justify-between">
              <AccessibleButton
                variant="secondary"
                onClick={handlePrev}
                disabled={currentStep === 0}
                ariaLabel={`Voltar para etapa ${currentStep}`}
              >
                ← Anterior
              </AccessibleButton>

              {currentStep < steps.length - 1 ? (
                <AccessibleButton
                  variant="primary"
                  onClick={handleNext}
                  ariaLabel={`Avançar para etapa ${currentStep + 2}`}
                >
                  Próximo →
                </AccessibleButton>
              ) : (
                <AccessibleButton
                  variant="primary"
                  onClick={handleSubmit}
                  ariaLabel="Enviar solicitação"
                >
                  ✓ Enviar Solicitação
                </AccessibleButton>
              )}
            </CardFooter>
          </Card>
        </div>
      </MainContent>
    </div>
  );
}
