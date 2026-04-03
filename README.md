# Fichas que Caem 🎲🌈

Um aplicativo web para coletar feedback em tempo real durante eventos de diversidade, equidade e inclusão (DEI), gerando nuvens de palavras dinâmicas e colaborativas.

## Sobre o Projeto

"Fichas que Caem" é um espaço acolhedor e inclusivo onde participantes de eventos podem compartilhar suas percepções, aprendizados e sentimentos de forma anônima. As contribuições são agregadas em nuvens de palavras que refletem a jornada coletiva de cada sessão.

### Características

- **Feedback Anônimo**: Sem necessidade de login ou cadastro
- **Tempo Real**: Atualizações automáticas usando Supabase Realtime
- **Nuvem de Palavras Dinâmica**: Visualização interativa das palavras mais mencionadas
- **Design Inclusivo**: Paleta arco-íris DEI, acessível e responsivo
- **4 Sessões Independentes**: Uma para cada momento do evento
- **Animações Suaves**: Experiência visual agradável e acolhedora

## Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Roteamento**: React Router v6
- **Banco de Dados**: Supabase (PostgreSQL + Realtime)
- **Nuvem de Palavras**: react-wordcloud + d3-cloud
- **Deploy**: GitHub Pages
- **Estilo**: CSS puro com variáveis customizadas

## Estrutura do Projeto

```
fichas-que-caem/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD para GitHub Pages
├── src/
│   ├── components/
│   │   ├── FeedbackForm.tsx    # Formulário de coleta
│   │   ├── FeedbackForm.css
│   │   ├── WordCloudDisplay.tsx # Visualização da nuvem
│   │   └── WordCloudDisplay.css
│   ├── pages/
│   │   ├── HomePage.tsx        # Página inicial
│   │   ├── HomePage.css
│   │   ├── SessionPage.tsx     # Página de coleta (4x)
│   │   ├── SessionPage.css
│   │   ├── ResultsPage.tsx     # Página de resultados (4x)
│   │   └── ResultsPage.css
│   ├── lib/
│   │   └── supabase.ts         # Cliente Supabase
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript
│   ├── utils/
│   │   └── textProcessing.ts   # Processamento de texto
│   ├── App.tsx                 # Rotas principais
│   ├── main.tsx                # Entrada da aplicação
│   └── index.css               # Estilos globais
├── supabase-setup.sql          # Script de configuração do DB
├── .env.example                # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Rotas

- `/` - Página inicial com menu de sessões
- `/sessao/1` a `/sessao/4` - Páginas de coleta de feedback
- `/sessao/1/resultados` a `/sessao/4/resultados` - Nuvens de palavras

## Configuração

### 1. Configurar o Supabase

1. Crie uma conta gratuita em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. No SQL Editor, execute o script `supabase-setup.sql`
4. Copie a URL e a chave anônima do projeto

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

### 5. Build para Produção

```bash
npm run build
```

## Deploy no GitHub Pages

### Configuração Inicial

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/fichas-que-caem.git
   git push -u origin main
   ```

2. **Atualizar o base path** em `vite.config.ts`:
   ```typescript
   base: '/nome-do-seu-repositorio/'
   ```

3. **Configurar Secrets no GitHub**:
   - Vá em Settings > Secrets and variables > Actions
   - Adicione:
     - `VITE_SUPABASE_URL`: URL do seu projeto Supabase
     - `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase

4. **Habilitar GitHub Pages**:
   - Settings > Pages
   - Source: GitHub Actions

5. **Push para disparar o deploy**:
   ```bash
   git push origin main
   ```

O site estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

## Estrutura do Banco de Dados

### Tabela `feedbacks`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único (gerado automaticamente) |
| `session_id` | INTEGER | Número da sessão (1-4) |
| `text` | TEXT | Feedback do participante (máx. 500 caracteres) |
| `created_at` | TIMESTAMP | Data/hora de criação |

### Políticas de Segurança (RLS)

- **SELECT**: Público (todos podem ler)
- **INSERT**: Público (todos podem escrever)
- **Realtime**: Habilitado para atualizações em tempo real

## Funcionalidades

### Coleta de Feedback

- Campo de texto livre (até 500 caracteres)
- Validação em tempo real
- Contador de caracteres
- Feedback visual ao enviar (animação de "ficha caindo")
- Tratamento de erros

### Nuvem de Palavras

- Atualização em tempo real via Supabase Realtime
- Processamento de texto com remoção de stopwords em português
- Contador de contribuições
- Botão de tela cheia
- Tooltip mostrando frequência das palavras
- Paleta de cores DEI (8 cores do arco-íris)

### Acessibilidade

- Navegação por teclado
- ARIA labels e roles
- Contraste adequado (WCAG AA)
- Suporte a modo escuro
- Respeito a `prefers-reduced-motion`
- Textos legíveis e espaçamentos amplos

## Customização

### Alterar Cores

Edite as variáveis CSS em `src/index.css`:

```css
:root {
  --rainbow-red: #ff6b6b;
  --rainbow-orange: #ffa07a;
  /* ... */
}
```

### Adicionar Stopwords

Edite `src/utils/textProcessing.ts` para incluir mais palavras a serem ignoradas na nuvem:

```typescript
export const STOPWORDS_PT = new Set([
  'palavra1',
  'palavra2',
  // ...
]);
```

### Alterar Número de Sessões

Para adicionar mais sessões:

1. Atualizar validação em `SessionPage.tsx` e `ResultsPage.tsx`
2. Adicionar cards em `HomePage.tsx`
3. Atualizar constraint no SQL: `CHECK (session_id >= 1 AND session_id <= N)`

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## Troubleshooting

### Erro "variáveis de ambiente não encontradas"

Certifique-se de criar o arquivo `.env.local` com as variáveis corretas.

### Nuvem de palavras não atualiza

1. Verifique se o Realtime está habilitado no Supabase:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE feedbacks;
   ```
2. Verifique o console do navegador para erros

### Deploy falha no GitHub Actions

1. Verifique se os Secrets estão configurados corretamente
2. Certifique-se que o base path no `vite.config.ts` está correto
3. Verifique os logs do Actions para detalhes

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## Licença

MIT License - Sinta-se livre para usar este projeto como quiser.

## Suporte

Para dúvidas ou problemas:

1. Verifique a documentação acima
2. Consulte os comentários no código
3. Abra uma issue no GitHub

---

Desenvolvido com carinho para promover diversidade, equidade e inclusão. 🌈✨

**Todas as vozes são bem-vindas e valorizadas.**
