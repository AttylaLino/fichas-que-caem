# Estrutura de Arquivos - Referência Rápida 📁

## Visão Geral

Este documento explica cada arquivo do projeto para facilitar navegação e manutenção.

## Raiz do Projeto

```
fichas-que-caem/
├── 📄 package.json              # Dependências e scripts NPM
├── 📄 tsconfig.json            # Configuração TypeScript
├── 📄 tsconfig.node.json       # Config TypeScript para Node
├── 📄 vite.config.ts           # Config Vite + base path
├── 📄 .eslintrc.json           # Regras de linting
├── 📄 .gitignore               # Arquivos ignorados pelo Git
├── 📄 .env.example             # Exemplo de variáveis de ambiente
├── 📄 index.html               # HTML base (SPA)
│
├── 📄 LICENSE                  # Licença MIT
├── 📄 README.md                # Documentação principal
├── 📄 RESUMO.md                # Visão geral do projeto
├── 📄 INSTALACAO.md            # Guia passo a passo
├── 📄 GUIA_DE_USO.md           # Como usar em eventos
├── 📄 CUSTOMIZACAO.md          # Guia de personalização
├── 📄 CONTRIBUTING.md          # Guia de contribuição
├── 📄 FAQ.md                   # Perguntas frequentes
├── 📄 CHECKLIST_EVENTO.md      # Checklist para eventos
├── 📄 ESTRUTURA_ARQUIVOS.md    # Este arquivo
│
├── 📄 supabase-setup.sql       # Script de configuração do DB
│
├── 📁 .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD GitHub Actions
│
├── 📁 src/                     # Código fonte
└── 📁 public/                  # Arquivos públicos estáticos
```

## Diretório `/src`

### Componentes (`src/components/`)

#### `FeedbackForm.tsx`
Formulário para coleta de feedback.

**Responsabilidades:**
- Input de texto com validação
- Contador de caracteres
- Submit para Supabase
- Feedback visual (sucesso/erro)
- Animação "ficha caindo"

**Props:**
- `sessionId: number` - Número da sessão (1-4)

**Estados:**
- `text` - Texto digitado
- `isSubmitting` - Estado de carregamento
- `showSuccess` - Mostra mensagem de sucesso
- `error` - Mensagem de erro

#### `FeedbackForm.css`
Estilos do formulário.

**Classes principais:**
- `.feedback-form` - Container do formulário
- `.feedback-textarea` - Campo de texto
- `.submit-button` - Botão de envio
- `.success-message` - Mensagem de sucesso
- `.falling-chip` - Animação da ficha caindo

#### `WordCloudDisplay.tsx`
Visualização da nuvem de palavras.

**Responsabilidades:**
- Carregar feedbacks do Supabase
- Processar texto (remover stopwords)
- Gerar nuvem de palavras
- Atualizar em tempo real (Realtime)
- Modo tela cheia
- Contador de contribuições

**Props:**
- `sessionId: number` - Número da sessão (1-4)

**Estados:**
- `words` - Array de palavras com frequências
- `feedbackCount` - Total de contribuições
- `isLoading` - Estado de carregamento
- `isFullscreen` - Modo tela cheia ativo
- `error` - Mensagem de erro

**Hooks:**
- `useEffect` - Setup de Realtime + carregamento inicial
- `useCallback` - Função de reload otimizada

#### `WordCloudDisplay.css`
Estilos da nuvem de palavras.

**Classes principais:**
- `.wordcloud-container` - Container principal
- `.wordcloud-canvas` - Canvas da nuvem
- `.fullscreen-button` - Botão tela cheia
- `.feedback-counter` - Contador de contribuições
- `.realtime-indicator` - Indicador de conexão

### Páginas (`src/pages/`)

#### `HomePage.tsx`
Página inicial com menu de sessões.

**Responsabilidades:**
- Apresentar aplicativo
- Grid com 4 cards de sessões
- Links para coleta e resultados
- Mensagem de acolhimento

**Rotas:**
- `/` - Rota raiz

#### `HomePage.css`
Estilos da home.

**Classes principais:**
- `.home-page` - Container da página
- `.session-cards` - Grid de sessões
- `.session-card` - Card individual
- `.floating-shapes` - Formas decorativas

#### `SessionPage.tsx`
Página de coleta de feedback.

**Responsabilidades:**
- Título e subtítulo da sessão
- Renderizar `FeedbackForm`
- Link para resultados
- Validação de sessionId (1-4)

**Rotas:**
- `/sessao/1` até `/sessao/4`

**Params:**
- `sessionId` - Número da sessão (URL param)

#### `SessionPage.css`
Estilos da página de sessão.

**Classes principais:**
- `.session-page` - Container
- `.main-title` - Título principal
- `.session-badge` - Badge com número
- `.results-link` - Link para resultados

#### `ResultsPage.tsx`
Página de visualização (nuvem).

**Responsabilidades:**
- Título e info da sessão
- Renderizar `WordCloudDisplay`
- Link de volta para sessão
- Validação de sessionId (1-4)

**Rotas:**
- `/sessao/1/resultados` até `/sessao/4/resultados`

**Params:**
- `sessionId` - Número da sessão (URL param)

#### `ResultsPage.css`
Estilos da página de resultados.

**Classes principais:**
- `.results-page` - Container
- `.results-title` - Título
- `.back-button` - Botão voltar
- `.floating-shapes` - Formas decorativas

### Bibliotecas (`src/lib/`)

#### `supabase.ts`
Cliente Supabase configurado.

**Exports:**
- `supabase` - Instância do cliente

**Configurações:**
- URL do projeto
- Chave anônima
- Realtime habilitado

**Validação:**
- Verifica se variáveis de ambiente existem
- Throw error se não configurado

### Tipos (`src/types/`)

#### `index.ts`
Tipos TypeScript do projeto.

**Interfaces:**

```typescript
Feedback {
  id: string
  session_id: number
  text: string
  created_at: string
}

WordCloudWord {
  text: string
  value: number
}

InsertFeedback {
  session_id: number
  text: string
}
```

### Utilitários (`src/utils/`)

#### `textProcessing.ts`
Processamento de texto e stopwords.

**Exports:**

```typescript
STOPWORDS_PT: Set<string>
// ~100 stopwords em português

processText(text: string): Map<string, number>
// Processa texto único

aggregateTexts(texts: string[]): Map<string, number>
// Agrega múltiplos textos

frequencyMapToWordCloud(map): WordCloudWord[]
// Converte para formato da nuvem
```

**Lógica:**
1. Normaliza texto (lowercase, remove pontuação)
2. Divide em palavras
3. Remove stopwords
4. Ignora palavras < 3 caracteres
5. Conta frequências
6. Retorna Map ou Array

### Arquivos Base (`src/`)

#### `App.tsx`
Componente raiz com roteamento.

**Responsabilidades:**
- Configurar React Router
- Definir rotas
- Configurar basename (GitHub Pages)
- Redirect 404 para home

**Rotas:**
```
/ → HomePage
/sessao/:sessionId → SessionPage
/sessao/:sessionId/resultados → ResultsPage
* → Redirect /
```

#### `main.tsx`
Entry point da aplicação.

**Responsabilidades:**
- Renderizar React app
- Injetar no DOM (#root)
- React.StrictMode

#### `index.css`
Estilos globais e variáveis CSS.

**Conteúdo:**
- Variáveis CSS (cores, espaçamentos, etc.)
- Reset CSS
- Tipografia global
- Animações (@keyframes)
- Scrollbar customizado
- Utilitários (fade-in, sr-only)
- Media queries
- Modo escuro
- Acessibilidade

**Variáveis principais:**
- `--rainbow-*` - Paleta DEI
- `--spacing-*` - Espaçamentos
- `--radius-*` - Bordas arredondadas
- `--shadow-*` - Sombras
- `--gradient-*` - Gradientes

#### `vite-env.d.ts`
Tipos do Vite (ambiente).

**Conteúdo:**
- Interface `ImportMetaEnv`
- Tipos das variáveis de ambiente
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Diretório `/.github`

### `workflows/deploy.yml`
GitHub Actions para CI/CD.

**Trigger:**
- Push na branch `main`
- Manual (workflow_dispatch)

**Jobs:**
1. **build**
   - Checkout código
   - Setup Node.js
   - Instalar dependências
   - Build com variáveis de ambiente
   - Upload artifact

2. **deploy**
   - Deploy no GitHub Pages
   - Depende de `build`

**Secrets necessários:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Arquivos de Configuração

### `package.json`
Dependências e scripts.

**Scripts:**
- `dev` - Servidor de desenvolvimento
- `build` - Build de produção
- `preview` - Preview do build
- `lint` - Verificar erros

**Dependencies:**
- `@supabase/supabase-js` - Cliente Supabase
- `react` - Framework UI
- `react-dom` - React DOM
- `react-router-dom` - Roteamento
- `react-wordcloud` - Nuvem de palavras
- `d3-cloud` - Biblioteca da nuvem

**DevDependencies:**
- `@vitejs/plugin-react` - Plugin Vite
- `typescript` - TypeScript
- `vite` - Bundler
- `eslint` - Linter
- `@types/*` - Tipos TypeScript

### `tsconfig.json`
Configuração TypeScript.

**Principais configurações:**
- `strict: true` - Modo strict
- `target: ES2020` - Target ECMAScript
- `jsx: react-jsx` - JSX transform
- `moduleResolution: bundler` - Resolução Vite

### `vite.config.ts`
Configuração Vite.

**Principais configurações:**
- `base` - Base path (para GitHub Pages)
- `plugins` - React plugin
- `build.outDir` - Diretório de saída (dist)

**IMPORTANTE:** Ajustar `base` para nome do seu repo!

### `.eslintrc.json`
Regras ESLint.

**Extends:**
- `eslint:recommended`
- `@typescript-eslint/recommended`
- `react-hooks/recommended`

### `.gitignore`
Arquivos ignorados pelo Git.

**Principais:**
- `node_modules/`
- `dist/`
- `.env.local`
- Editor configs

### `.env.example`
Template de variáveis de ambiente.

**Conteúdo:**
```env
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

## Arquivo SQL

### `supabase-setup.sql`
Script de configuração do banco.

**Conteúdo:**
1. CREATE TABLE feedbacks
2. CREATE INDEX (otimizações)
3. ENABLE RLS
4. CREATE POLICY (leitura pública)
5. CREATE POLICY (escrita pública)
6. ALTER PUBLICATION (realtime)
7. Comandos úteis (comentados)

## Arquivos de Documentação

Todos em Markdown, veja seção "Raiz do Projeto" acima.

## Como Navegar

### Quero alterar o visual
→ `src/index.css` (global)
→ `src/components/*.css` (específico)
→ `CUSTOMIZACAO.md` (guia)

### Quero alterar funcionalidade
→ `src/components/*.tsx`
→ `src/pages/*.tsx`

### Quero alterar processamento de texto
→ `src/utils/textProcessing.ts`

### Quero alterar banco de dados
→ `supabase-setup.sql`
→ `src/lib/supabase.ts`

### Quero alterar rotas
→ `src/App.tsx`
→ `vite.config.ts` (base path)

### Quero entender o deploy
→ `.github/workflows/deploy.yml`
→ `README.md` (seção deploy)

### Preciso de ajuda
→ `INSTALACAO.md` (setup)
→ `FAQ.md` (dúvidas comuns)
→ `README.md` (documentação completa)

## Dicas

### Buscar por funcionalidade
Use o comando Find (Ctrl+Shift+F) no editor para buscar por:
- Nomes de função
- Classes CSS
- Comentários específicos

### Comentários no Código
Todos os arquivos principais têm comentários explicativos. Procure por:
- `//` para comentários inline
- `/* */` para blocos
- `/** */` para JSDoc

### Estrutura de Pastas
A estrutura segue padrões React:
- `components/` - Componentes reutilizáveis
- `pages/` - Páginas/rotas
- `lib/` - Bibliotecas/clientes
- `types/` - Tipos TypeScript
- `utils/` - Funções utilitárias

---

**Boa navegação!** 🧭✨
