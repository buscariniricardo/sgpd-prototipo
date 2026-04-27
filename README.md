# SGPD - Protótipo

**Sistema de Gestão de Pedidos e Demandas | Versão 3.0**

---

## 📦 O Que Nós Temos Aqui

Este é um **protótipo profissional completo** com:

✅ **5 Telas Navegáveis**
- Login (com validação)
- Dashboard (com KPIs, gráficos, tabela)
- Nova Solicitação (step form com 3 etapas)
- Lista de Solicitações (com filtros e status)
- Detalhes da Solicitação (com timeline e comentários)

✅ **Design System Profissional**
- Cores corporativas (Azul #2563EB)
- Tipografia Inter
- Componentes reutilizáveis
- Acessibilidade WCAG 2.1 AA

✅ **Componentes Acessíveis**
- AccessibleInput, AccessibleButton, AccessibleDropdown
- EnhancedSidebar, EnhancedHeader, Breadcrumb
- Modal, Tabs, Pagination, Toast

✅ **Animações e Transições**
- Fade-in, slide-up, bounce
- Hover effects profissionais
- Micro-interações

---

## 📁 Estrutura de Arquivos

```
sgpd-prototipo-completo/
│
├── 📄 index.html                    ← ABRA ESTE ARQUIVO NO NAVEGADOR
├── 📄 package.json                  ← Dependências do projeto
├── 📄 README.md                     ← Este arquivo
│
├── 📁 client/
│   ├── 📄 index.html               ← HTML da aplicação React
│   ├── 📁 src/
│   │   ├── 📁 components/          ← Componentes reutilizáveis
│   │   │   ├── AccessibleComponents.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── AdvancedComponents.tsx
│   │   │   └── SGPDComponents.tsx
│   │   │
│   │   ├── 📁 pages/               ← Páginas/Telas
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── NewRequest.tsx
│   │   │   ├── ListRequests.tsx
│   │   │   └── RequestDetails.tsx
│   │   │
│   │   ├── 📁 styles/              ← Estilos CSS
│   │   │   └── animations.css
│   │   │
│   │   ├── 📄 App.tsx              ← Rotas principais
│   │   ├── 📄 index.css            ← Design System (cores, tipografia)
│   │   └── 📄 main.tsx             ← Entry point
│   │
│   └── 📁 public/                  ← Arquivos estáticos
│
├── 📁 server/                       ← Backend (Express)
│   └── 📄 index.ts
│
└── 📁 docs/                         ← Documentação
    ├── COMPONENTES_INTEGRADOS.md
    ├── ACESSIBILIDADE_VALIDACAO.md
    └── GUIA_VSCODE_GITHUB.md
```

---

## 🎨 Telas Disponíveis

### 1. 🔐 Login
- Email e senha
- Validação básica
- Botão "Entrar"

### 2. 📊 Dashboard
- Sidebar com navegação
- Header com notificações
- 3 KPI Cards (métricas)
- 2 Gráficos (solicitações por mês, distribuição de status)
- Tabela de solicitações recentes

### 3. ➕ Nova Solicitação
- Step Form com 3 etapas:
  - **Etapa 1:** Informações (título, descrição, categoria)
  - **Etapa 2:** Detalhes (prioridade, responsável, prazo)
  - **Etapa 3:** Confirmação (resumo dos dados)
- Validação por etapa
- Mensagens de erro claras

### 4. 📋 Lista de Solicitações
- Tabela com todas as solicitações
- Filtros por status
- Ordenação
- Badges com cores

### 5. 📝 Detalhes da Solicitação
- Timeline de progresso
- Status visual
- Comentários em estilo chat
- Botão para atualizar

---

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem de dados
- **Tailwind CSS 4** - Estilos
- **shadcn/ui** - Componentes UI
- **Wouter** - Roteamento
- **Framer Motion** - Animações
- **Vite** - Build tool

---

## 🎯 Recursos Principais

✅ **Navegação Completa** - Fluxo Login → Dashboard → Ações  
✅ **Formulários Validados** - Step form com validação por etapa  
✅ **Design Responsivo** - Funciona em desktop, tablet, mobile  
✅ **Acessibilidade** - WCAG 2.1 AA compliant  
✅ **Componentes Reutilizáveis** - 20+ componentes prontos  
✅ **Animações Suaves** - Transições profissionais  
✅ **Código Limpo** - TypeScript, bem organizado  

---

**Versão:** 3.0  
**Última Atualização:** 23 de Abril de 2026  
**Status:** ✅ Pronto para Usar
