# 📖 Guia Completo: VS Code + GitHub

**Passo a Passo Profissional | Para Iniciantes**

---

## 🎯 Objetivo Final

Você vai:
1. ✅ Abrir o projeto no VS Code
2. ✅ Fazer upload para GitHub
3. ✅ Compartilhar o link com sua equipe

---

# PARTE 1: PREPARAR O COMPUTADOR

## ✅ Passo 1: Instalar Programas Necessários

### 1.1 Instalar VS Code
- Acesse: https://code.visualstudio.com/
- Clique em "Download"
- Instale normalmente (próximo, próximo, concluir)

### 1.2 Instalar Git
- Acesse: https://git-scm.com/
- Clique em "Download"
- Instale normalmente (use as opções padrão)

### 1.3 Criar Conta GitHub (se não tiver)
- Acesse: https://github.com/
- Clique em "Sign up"
- Preencha email, senha, nome de usuário
- Confirme email
- Pronto! Você tem conta GitHub

---

# PARTE 2: ABRIR NO VS CODE

## ✅ Passo 2: Abrir a Pasta do Projeto

### Opção A: Pelo VS Code (Recomendado)

**2.1 Abra o VS Code**
- Procure "Visual Studio Code" no menu iniciar
- Clique para abrir

**2.2 Abra a Pasta**
- No menu: `File` → `Open Folder`
- Navegue até: `C:\Users\[SEU_USUARIO]\Downloads\sgpd-prototipo`
- (Ou onde você salvou a pasta)
- Clique em "Selecionar Pasta"

**2.3 Confie na Pasta**
- Se aparecer "Do you trust the authors..."
- Clique em "Yes, I trust the authors"

### Opção B: Pelo Terminal (Avançado)

**Abra o terminal e digite:**
```bash
cd C:\Users\[SEU_USUARIO]\Downloads\sgpd-prototipo
code .
```

---

## ✅ Passo 3: Explorar a Estrutura

Você vai ver na esquerda:

```
📁 sgpd-prototipo/
  📁 client/
    📁 src/
      📁 components/
      📁 pages/
      📁 styles/
    📁 public/
    index.html
  📁 server/
  📄 package.json
  📄 README.md
  📄 index.html (ARQUIVO PRINCIPAL)
  📄 LINKS_ACESSO.md
  📄 COMPONENTES_INTEGRADOS.md
  📄 GUIA_VSCODE_GITHUB.md (este arquivo)
```

---

## ✅ Passo 4: Instalar Extensões Úteis (Opcional)

No VS Code, clique no ícone de extensões (quadrado com 4 quadradinhos):

**Recomendadas:**
- `Prettier` - Formata código automaticamente
- `ES7+ React/Redux/React-Native snippets` - Atalhos para React
- `Thunder Client` - Testar APIs
- `GitLens` - Ver histórico do Git

---

# PARTE 3: SUBIR NO GITHUB

## ✅ Passo 5: Criar Repositório no GitHub

**5.1 Acesse GitHub**
- Vá para: https://github.com/
- Faça login com sua conta

**5.2 Criar Novo Repositório**
- Clique no ícone `+` (canto superior direito)
- Selecione "New repository"

**5.3 Preencher Informações**

| Campo | Valor |
|-------|-------|
| Repository name | `sgpd-prototipo` |
| Description | `Protótipo profissional do SGPD com React, Tailwind e componentes acessíveis` |
| Public/Private | `Public` (para compartilhar) |
| Add .gitignore | `Node` |
| Add a license | `MIT` |

**5.4 Clique em "Create repository"**

**5.5 Copie o Link**
- Você vai ver algo como:
```
https://github.com/seu-usuario/sgpd-prototipo.git
```
- Copie este link (você vai precisar)

---

## ✅ Passo 6: Configurar Git no Computador

### 6.1 Abra o Terminal no VS Code

- Pressione: `Ctrl + `` (backtick)
- Ou: `Terminal` → `New Terminal`

### 6.2 Configure Seu Nome e Email

Digite no terminal:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

**Exemplo:**
```bash
git config --global user.name "João Silva"
git config --global user.email "joao@example.com"
```

---

## ✅ Passo 7: Enviar Projeto para GitHub

### 7.1 Inicializar Git (primeira vez)

No terminal do VS Code, digite:
```bash
git init
```

### 7.2 Adicionar Todos os Arquivos

```bash
git add .
```

### 7.3 Criar Primeiro Commit

```bash
git commit -m "Inicial: Protótipo SGPD com componentes acessíveis"
```

### 7.4 Adicionar Repositório Remoto

Substitua o link pelo que você copiou no Passo 5.5:
```bash
git remote add origin https://github.com/seu-usuario/sgpd-prototipo.git
```

### 7.5 Enviar para GitHub

```bash
git branch -M main
git push -u origin main
```

**Pode pedir sua senha do GitHub:**
- Digite sua senha (não aparece na tela, é normal)
- Pressione Enter

---

## ✅ Passo 8: Verificar no GitHub

**8.1 Abra GitHub**
- Vá para: https://github.com/seu-usuario/sgpd-prototipo
- Você vai ver todos os seus arquivos!

**8.2 Copie o Link**
- O link é: `https://github.com/seu-usuario/sgpd-prototipo`
- Compartilhe com sua equipe!

---

# PARTE 4: FAZER MUDANÇAS E ATUALIZAR

## ✅ Passo 9: Fazer Alterações no Código

**9.1 Edite um Arquivo**
- Abra qualquer arquivo no VS Code
- Faça suas mudanças
- Salve (Ctrl+S)

**9.2 Ver Mudanças no Git**
- Clique no ícone de Git (esquerda, 3º ícone)
- Você vai ver os arquivos modificados

---

## ✅ Passo 10: Enviar Mudanças para GitHub

### Opção A: Pelo Terminal (Recomendado)

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

**Exemplos de descrição:**
```bash
git commit -m "Adicionar validação no formulário"
git commit -m "Corrigir bug no dashboard"
git commit -m "Melhorar acessibilidade dos botões"
```

### Opção B: Pelo VS Code (Mais Fácil)

1. Clique no ícone de Git (esquerda)
2. Escreva a mensagem no campo "Message"
3. Clique no ícone de "Commit" (✓)
4. Clique em "Sync Changes"

---

# PARTE 5: TRABALHAR EM EQUIPE

## ✅ Passo 11: Compartilhar com Sua Equipe

**11.1 Envie o Link**
```
https://github.com/seu-usuario/sgpd-prototipo
```

**11.2 Sua Equipe Pode:**
- Ver o código
- Fazer comentários
- Fazer "Fork" (cópia pessoal)
- Fazer "Pull Request" (sugerir mudanças)

---

## ✅ Passo 12: Receber Mudanças da Equipe

Se alguém fez mudanças no GitHub:

**No terminal:**
```bash
git pull
```

Isso baixa as mudanças mais recentes.

---

# PARTE 6: TROUBLESHOOTING

## ❌ Problema: "Git não reconhecido"

**Solução:**
1. Reinicie o VS Code
2. Ou reinicie o computador
3. Ou reinstale o Git

---

## ❌ Problema: "Erro de autenticação no GitHub"

**Solução:**
1. GitHub agora usa "Personal Access Token" (não senha)
2. Crie um token em: https://github.com/settings/tokens
3. Use o token como senha

**Passo a passo:**
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token"
3. Selecione `repo` (todas as opções)
4. Clique em "Generate token"
5. Copie o token (vai aparecer uma vez só!)
6. No terminal, quando pedir senha, cole o token

---

## ❌ Problema: "Pasta não encontrada"

**Solução:**
1. Verifique o caminho correto
2. Use aspas se o caminho tiver espaços:
```bash
cd "C:\Users\Seu Usuario\Downloads\sgpd-prototipo"
```

---

## ❌ Problema: "Não consigo fazer push"

**Solução:**
1. Verifique se fez `git add .`
2. Verifique se fez `git commit -m "mensagem"`
3. Verifique se tem internet
4. Tente novamente

---

# RESUMO RÁPIDO

## Primeira Vez (Setup Completo)

```bash
# 1. Ir para a pasta
cd C:\Users\[SEU_USUARIO]\Downloads\sgpd-prototipo

# 2. Inicializar Git
git init

# 3. Configurar usuário
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# 4. Adicionar arquivos
git add .

# 5. Primeiro commit
git commit -m "Inicial: Protótipo SGPD"

# 6. Adicionar repositório remoto
git remote add origin https://github.com/seu-usuario/sgpd-prototipo.git

# 7. Enviar
git branch -M main
git push -u origin main
```

## Próximas Vezes (Atualizar)

```bash
# Fazer mudanças no código...

# Adicionar mudanças
git add .

# Descrever mudança
git commit -m "Descrição da mudança"

# Enviar
git push
```

---

# CHECKLIST FINAL

- [ ] Instalei VS Code
- [ ] Instalei Git
- [ ] Criei conta GitHub
- [ ] Abri a pasta no VS Code
- [ ] Criei repositório no GitHub
- [ ] Configurei Git (nome e email)
- [ ] Fiz primeiro commit
- [ ] Enviei para GitHub
- [ ] Verifiquei no GitHub
- [ ] Compartilhei o link com minha equipe

---

# PRÓXIMOS PASSOS

1. **Editar Código** - Faça mudanças no VS Code
2. **Testar Localmente** - Abra o arquivo HTML no navegador
3. **Commit & Push** - Envie para GitHub
4. **Compartilhar** - Mande o link para sua equipe
5. **Colaborar** - Receba feedback e faça melhorias

---

**Versão:** 1.0  
**Última Atualização:** 23 de Abril de 2026  
**Status:** ✅ Pronto para Usar

---

## 📞 Dúvidas Comuns

**P: Posso editar direto no GitHub?**
R: Sim, mas não é recomendado. Use VS Code para melhor experiência.

**P: Como faço para voltar uma mudança?**
R: Use `git revert` ou `git reset` (peça ajuda se precisar).

**P: Posso trabalhar offline?**
R: Sim! Git funciona offline. Quando conectar, use `git push`.

**P: Como faço para deletar um repositório?**
R: GitHub → Configurações do repositório → Delete this repository.

---

**Boa sorte! 🚀**
