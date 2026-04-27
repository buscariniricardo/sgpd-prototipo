# SGPD - Protótipo

**Sistema de Gestão de Pedidos e Demandas | Versão 3.0**

---

## 📦 O Que Você Tem Aqui

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

## 🚀 Como Começar (3 Passos)

### 1️⃣ Abrir no VS Code

**Opção A (Mais Fácil):**
- Clique com botão direito na pasta `sgpd-prototipo-completo`
- Selecione "Abrir com Code"

**Opção B (Pelo VS Code):**
- Abra VS Code
- `File` → `Open Folder`
- Selecione a pasta `sgpd-prototipo-completo`

### 2️⃣ Ver o Protótipo Funcionando

**Abra o arquivo HTML:**
- Clique duas vezes em `index.html` (na raiz da pasta)
- Ou clique com botão direito → "Abrir com navegador"

**Você vai ver:**
- Dashboard com sidebar
- Navegação entre telas
- Formulários interativos
- Tudo funcionando! 🎊

### 3️⃣ Editar e Customizar

**Abra qualquer arquivo no VS Code:**
- `client/src/components/` - Componentes
- `client/src/pages/` - Telas
- `client/src/styles/` - Estilos
- `index.html` - Arquivo principal HTML

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

## 📚 Documentação

Dentro da pasta `docs/` você encontra:

- **COMPONENTES_INTEGRADOS.md** - Guia de componentes acessíveis
- **ACESSIBILIDADE_VALIDACAO.md** - Checklist WCAG 2.1 AA
- **GUIA_VSCODE_GITHUB.md** - Como subir no GitHub

---

## 🚀 Próximos Passos

### 1. Testar Localmente
```bash
# Abra index.html no navegador
# Ou use um servidor local
```

### 2. Customizar
- Edite cores em `client/src/index.css`
- Edite componentes em `client/src/components/`
- Edite páginas em `client/src/pages/`

### 3. Subir no GitHub
- Siga o guia em `docs/GUIA_VSCODE_GITHUB.md`
- Ou use o painel Manus para exportar

### 4. Deploy
- Manus (recomendado)
- Vercel
- Netlify
- GitHub Pages

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

## 💡 Dicas de Uso

### Para Abrir o Protótipo
1. Clique duas vezes em `index.html`
2. Ou clique com botão direito → "Abrir com navegador"

### Para Editar
1. Abra em VS Code
2. Edite os arquivos
3. Salve (Ctrl+S)
4. Recarregue o navegador (F5)

### Para Compartilhar
1. Envie a pasta `sgpd-prototipo-completo` para sua equipe
2. Ou suba no GitHub (veja guia)
3. Ou publique no Manus

---

## 🐛 Troubleshooting

### "Arquivo não encontrado"
- Verifique se está na pasta correta
- Use o caminho completo

### "Componentes não aparecem"
- Recarregue a página (F5)
- Limpe cache (Ctrl+Shift+Delete)

### "Erro no console"
- Abra DevTools (F12)
- Veja a mensagem de erro
- Procure solução no guia

---

## 📞 Suporte

Se tiver dúvidas:
1. Leia a documentação em `docs/`
2. Verifique o guia de troubleshooting
3. Procure a solução no console (F12)

---

## ✅ Checklist de Início

- [ ] Baixei a pasta `sgpd-prototipo-completo`
- [ ] Descompactei o ZIP
- [ ] Abri em VS Code
- [ ] Abri o arquivo `index.html` no navegador
- [ ] Vi o Dashboard funcionando
- [ ] Cliquei em "Nova Solicitação"
- [ ] Testei o formulário com 3 etapas
- [ ] Naveguei entre as telas
- [ ] Li a documentação

---

## 🎊 Pronto!

Você tem um **protótipo profissional completo** pronto para:
- ✅ Apresentar para stakeholders
- ✅ Validar com usuários
- ✅ Evoluir para produção
- ✅ Compartilhar com equipe

---

**Versão:** 3.0  
**Última Atualização:** 23 de Abril de 2026  
**Status:** ✅ Pronto para Usar

**Boa sorte! 🚀**
