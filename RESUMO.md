# Fichas que Caem - Resumo do Projeto ✨

## O que foi criado

Aplicativo web completo para coletar feedback em tempo real durante eventos de diversidade, equidade e inclusão (DEI).

## Estrutura de Arquivos

```
fichas-que-caem/
├── 📁 .github/workflows/
│   └── deploy.yml              # Deploy automático no GitHub Pages
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── FeedbackForm.tsx    # Formulário de feedback com validação
│   │   ├── FeedbackForm.css    # Estilos do formulário
│   │   ├── WordCloudDisplay.tsx # Nuvem de palavras com realtime
│   │   └── WordCloudDisplay.css # Estilos da nuvem
│   │
│   ├── 📁 pages/
│   │   ├── HomePage.tsx        # Página inicial com grid de sessões
│   │   ├── HomePage.css        # Estilos da home
│   │   ├── SessionPage.tsx     # Página de coleta de feedback
│   │   ├── SessionPage.css     # Estilos da sessão
│   │   ├── ResultsPage.tsx     # Página com nuvem de palavras
│   │   └── ResultsPage.css     # Estilos dos resultados
│   │
│   ├── 📁 lib/
│   │   └── supabase.ts         # Cliente Supabase configurado
│   │
│   ├── 📁 types/
│   │   └── index.ts            # Tipos TypeScript
│   │
│   ├── 📁 utils/
│   │   └── textProcessing.ts   # Processamento de texto + stopwords
│   │
│   ├── App.tsx                 # Roteamento principal
│   ├── main.tsx                # Entry point
│   ├── index.css               # Estilos globais + paleta DEI
│   └── vite-env.d.ts           # Tipos do ambiente Vite
│
├── 📄 supabase-setup.sql       # Script SQL completo
├── 📄 .env.example             # Exemplo de configuração
├── 📄 package.json             # Dependências e scripts
├── 📄 tsconfig.json            # Configuração TypeScript
├── 📄 vite.config.ts           # Configuração Vite + GitHub Pages
├── 📄 .gitignore               # Arquivos ignorados
│
├── 📖 README.md                # Documentação completa
├── 📖 INSTALACAO.md            # Guia rápido de instalação
└── 📖 GUIA_DE_USO.md           # Guia para uso durante eventos
```

## Funcionalidades Implementadas

### ✅ Core Features
- [x] 4 sessões independentes
- [x] Coleta de feedback anônimo (sem login)
- [x] Nuvem de palavras dinâmica
- [x] Atualização em tempo real (Supabase Realtime)
- [x] Processamento de texto com remoção de stopwords em português
- [x] Contador de caracteres (limite 500)
- [x] Validação de entrada

### ✅ UI/UX
- [x] Design inspirado em DEI com paleta arco-íris
- [x] Gradientes e cores vibrantes
- [x] Animações suaves (fade-in, slide-down, float)
- [x] Animação de "ficha caindo" ao enviar
- [x] Feedback visual de sucesso/erro
- [x] Botão de tela cheia na nuvem
- [x] Contador de contribuições por sessão
- [x] Tooltip com frequência das palavras

### ✅ Acessibilidade
- [x] Mobile-first e responsivo
- [x] Navegação por teclado
- [x] ARIA labels e roles
- [x] Contraste WCAG AA
- [x] Suporte a modo escuro
- [x] Respeito a prefers-reduced-motion
- [x] Textos legíveis e espaçamentos amplos

### ✅ Técnico
- [x] React 18 + TypeScript
- [x] Vite como bundler
- [x] React Router v6
- [x] Supabase (PostgreSQL + Realtime)
- [x] Deploy automático via GitHub Actions
- [x] Variáveis de ambiente
- [x] TypeScript strict mode
- [x] CSS puro (sem framework)
- [x] Comentários explicativos no código

### ✅ Documentação
- [x] README completo com troubleshooting
- [x] Guia rápido de instalação passo a passo
- [x] Guia de uso durante eventos
- [x] Script SQL documentado
- [x] Exemplos de uso
- [x] Comandos úteis

## Rotas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Home com menu de sessões |
| `/sessao/1` | Coleta de feedback - Sessão 1 |
| `/sessao/2` | Coleta de feedback - Sessão 2 |
| `/sessao/3` | Coleta de feedback - Sessão 3 |
| `/sessao/4` | Coleta de feedback - Sessão 4 |
| `/sessao/1/resultados` | Nuvem de palavras - Sessão 1 |
| `/sessao/2/resultados` | Nuvem de palavras - Sessão 2 |
| `/sessao/3/resultados` | Nuvem de palavras - Sessão 3 |
| `/sessao/4/resultados` | Nuvem de palavras - Sessão 4 |

## Tecnologias Utilizadas

- **Frontend**: React 18.2.0 + TypeScript 5.2.2
- **Build Tool**: Vite 5.0.8
- **Roteamento**: React Router 6.21.0
- **Database**: Supabase (PostgreSQL + Realtime)
- **Word Cloud**: react-wordcloud 1.2.7 + d3-cloud 1.2.7
- **Deploy**: GitHub Pages via GitHub Actions
- **Styling**: CSS puro com custom properties

## Paleta de Cores DEI

```css
--rainbow-red: #ff6b6b
--rainbow-orange: #ffa07a
--rainbow-yellow: #ffd93d
--rainbow-green: #6bcf7f
--rainbow-blue: #4ecdc4
--rainbow-indigo: #5d5fef
--rainbow-violet: #c77dff
--rainbow-pink: #ff69eb
```

## Banco de Dados (Supabase)

### Tabela: feedbacks

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Chave primária (auto) |
| session_id | INTEGER | 1-4 |
| text | TEXT | Max 500 chars |
| created_at | TIMESTAMP | Auto |

### Políticas RLS
- **SELECT**: Público
- **INSERT**: Público
- **Realtime**: Habilitado

## Próximos Passos para Uso

1. **Instalar dependências**: `npm install`
2. **Configurar Supabase**: Seguir `INSTALACAO.md`
3. **Criar `.env.local`**: Com credenciais do Supabase
4. **Testar localmente**: `npm run dev`
5. **Deploy no GitHub Pages**: Seguir seção de deploy no README
6. **Compartilhar links**: Com participantes do evento
7. **Projetar nuvens**: No telão durante o evento

## Comandos Principais

```bash
# Desenvolvimento
npm run dev          # http://localhost:5173

# Build
npm run build        # Gera /dist

# Preview
npm run preview      # Testa build localmente

# Lint
npm run lint         # Verifica erros TypeScript
```

## Recursos de Segurança

- Sem autenticação necessária (anônimo)
- RLS habilitado no Supabase
- Rate limiting do Supabase
- Validação de entrada (max 500 chars)
- Constraint de session_id (1-4)
- Variáveis de ambiente para secrets
- .env.local no .gitignore

## Considerações Importantes

1. **Base Path**: Altere em `vite.config.ts` para o nome do seu repositório
2. **Secrets**: Configure no GitHub Actions antes do deploy
3. **Realtime**: Certifique-se de habilitar no Supabase
4. **Teste**: Sempre teste localmente antes do evento
5. **Backup**: Tenha um plano B (post-its, Google Forms)
6. **Dados**: Exclua após o evento se não for mais usar

## Customizações Possíveis

- Alterar cores da paleta (index.css)
- Adicionar/remover stopwords (textProcessing.ts)
- Mudar número de sessões (validação + SQL)
- Ajustar limite de caracteres (forms + SQL)
- Personalizar textos das páginas
- Modificar configurações da nuvem (WordCloudDisplay.tsx)

## Créditos

Desenvolvido com foco em:
- Diversidade
- Equidade
- Inclusão
- Acessibilidade
- Experiência do usuário
- Código limpo e documentado

---

**Todas as vozes são bem-vindas e valorizadas.** 🌈✨

Para começar, leia: **INSTALACAO.md**
Para usar em eventos, leia: **GUIA_DE_USO.md**
Para detalhes técnicos, leia: **README.md**
