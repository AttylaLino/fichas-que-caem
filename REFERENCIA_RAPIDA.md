# Referência Rápida - Comandos e URLs 🚀

## Comandos NPM

```bash
# Instalação
npm install

# Desenvolvimento (localhost:5173)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting (verificar erros)
npm run lint
```

## Estrutura de URLs

### Produção (GitHub Pages)
```
https://seu-usuario.github.io/fichas-que-caem/
https://seu-usuario.github.io/fichas-que-caem/sessao/1
https://seu-usuario.github.io/fichas-que-caem/sessao/2
https://seu-usuario.github.io/fichas-que-caem/sessao/3
https://seu-usuario.github.io/fichas-que-caem/sessao/4
https://seu-usuario.github.io/fichas-que-caem/sessao/1/resultados
https://seu-usuario.github.io/fichas-que-caem/sessao/2/resultados
https://seu-usuario.github.io/fichas-que-caem/sessao/3/resultados
https://seu-usuario.github.io/fichas-que-caem/sessao/4/resultados
```

### Desenvolvimento (Local)
```
http://localhost:5173/
http://localhost:5173/sessao/1
http://localhost:5173/sessao/2
http://localhost:5173/sessao/3
http://localhost:5173/sessao/4
http://localhost:5173/sessao/1/resultados
http://localhost:5173/sessao/2/resultados
http://localhost:5173/sessao/3/resultados
http://localhost:5173/sessao/4/resultados
```

## Git - Comandos Básicos

```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "mensagem"

# Conectar ao GitHub
git remote add origin https://github.com/usuario/repo.git

# Push primeira vez
git push -u origin main

# Push normal
git push

# Ver status
git status

# Ver histórico
git log --oneline

# Criar branch
git checkout -b minha-branch

# Voltar para main
git checkout main
```

## Supabase - SQL Útil

```sql
-- Ver todos os feedbacks
SELECT * FROM feedbacks ORDER BY created_at DESC;

-- Contar por sessão
SELECT session_id, COUNT(*) as total 
FROM feedbacks 
GROUP BY session_id;

-- Ver feedbacks de uma sessão
SELECT * FROM feedbacks 
WHERE session_id = 1 
ORDER BY created_at DESC;

-- Deletar feedbacks antigos
DELETE FROM feedbacks 
WHERE created_at < NOW() - INTERVAL '1 day';

-- Deletar todos (CUIDADO!)
DELETE FROM feedbacks;

-- Deletar sessão específica
DELETE FROM feedbacks WHERE session_id = 1;

-- Ver palavras mais frequentes (básico)
SELECT LOWER(word) as palavra, COUNT(*) as frequencia
FROM feedbacks, 
     LATERAL unnest(string_to_array(text, ' ')) as word
WHERE session_id = 1
GROUP BY palavra
ORDER BY frequencia DESC
LIMIT 20;
```

## Variáveis de Ambiente

### Desenvolvimento (`.env.local`)
```env
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...chave...
```

### GitHub Actions (Secrets)
```
Settings > Secrets and variables > Actions > New repository secret

Nome: VITE_SUPABASE_URL
Valor: https://abc123.supabase.co

Nome: VITE_SUPABASE_ANON_KEY
Valor: eyJ...chave...
```

## Arquivos Importantes

```bash
# Configuração
vite.config.ts          # Base path aqui
package.json            # Dependências
tsconfig.json           # Config TypeScript
.env.local              # Variáveis locais (criar)

# Código
src/App.tsx             # Rotas
src/main.tsx            # Entry point
src/index.css           # Estilos globais

# Componentes principais
src/components/FeedbackForm.tsx
src/components/WordCloudDisplay.tsx

# Páginas
src/pages/HomePage.tsx
src/pages/SessionPage.tsx
src/pages/ResultsPage.tsx

# Lógica
src/lib/supabase.ts
src/utils/textProcessing.ts
src/types/index.ts

# Deploy
.github/workflows/deploy.yml

# Database
supabase-setup.sql
```

## Customização Rápida

### Mudar cores
```css
/* src/index.css */
:root {
  --rainbow-red: #ff6b6b;
  --rainbow-orange: #ffa07a;
  /* ... */
}
```

### Mudar título
```tsx
/* src/pages/SessionPage.tsx */
<h1 className="main-title">
  Seu Título Aqui
</h1>
```

### Adicionar stopwords
```typescript
/* src/utils/textProcessing.ts */
export const STOPWORDS_PT = new Set([
  'palavra1',
  'palavra2',
  // ...
]);
```

### Mudar limite de caracteres
```tsx
/* src/components/FeedbackForm.tsx */
const remainingChars = 1000 - text.length; // era 500
<textarea maxLength={1000} /> // era 500
```

```sql
/* supabase-setup.sql */
CHECK (char_length(text) <= 1000) -- era 500
```

## Atalhos do Editor (VS Code)

```
Ctrl + P         # Buscar arquivo
Ctrl + Shift + F # Buscar em todos arquivos
Ctrl + D         # Selecionar próxima ocorrência
Ctrl + /         # Comentar linha
Alt + Shift + F  # Formatar documento
F2               # Renomear símbolo
Ctrl + Space     # Autocomplete
```

## Troubleshooting Rápido

### Site não carrega localmente
```bash
# Verificar se porta está em uso
npm run dev

# Se erro de porta, matar processo
# Windows: netstat -ano | findstr :5173
# Linux/Mac: lsof -ti:5173 | xargs kill
```

### Erro "variáveis de ambiente"
```bash
# Criar .env.local
cp .env.example .env.local
# Editar com suas credenciais
```

### Build falha
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json
npm install

# Limpar cache Vite
rm -rf dist .vite
npm run build
```

### GitHub Actions falha
```bash
# Verificar secrets
GitHub Repo > Settings > Secrets and variables > Actions

# Verificar base path
# vite.config.ts: base: '/nome-do-repo/'
```

## Links Úteis

### Dashboards
- Supabase: https://supabase.com/dashboard
- GitHub: https://github.com
- GitHub Pages Status: https://github.com/usuario/repo/deployments

### Documentação
- React: https://react.dev
- TypeScript: https://typescriptlang.org
- Vite: https://vitejs.dev
- Supabase: https://supabase.com/docs
- React Router: https://reactrouter.com

### Ferramentas
- QR Code Generator: https://qr-code-generator.com
- Color Picker: https://coolors.co
- Contrast Checker: https://webaim.org/resources/contrastchecker

## Checklist Rápido

### Setup Inicial
- [ ] `npm install`
- [ ] Criar `.env.local`
- [ ] Configurar Supabase
- [ ] `npm run dev` e testar

### Deploy
- [ ] Criar repo GitHub
- [ ] Ajustar `base` no `vite.config.ts`
- [ ] Adicionar Secrets
- [ ] `git push`
- [ ] Verificar GitHub Actions
- [ ] Testar URL de produção

### Pré-Evento
- [ ] Site funcionando
- [ ] Supabase OK
- [ ] Links preparados
- [ ] Plano B pronto

## Atalhos de Navegação

```bash
# Ver todos arquivos
ls -la

# Ver estrutura de pastas
tree -L 2

# Buscar em arquivos
grep -r "palavra" src/

# Ver tamanho do build
du -sh dist/

# Ver porta em uso
lsof -i :5173  # Mac/Linux
netstat -ano | findstr :5173  # Windows
```

## Console do Navegador

```javascript
// Verificar variáveis de ambiente (F12 > Console)
console.log(import.meta.env.VITE_SUPABASE_URL);

// Ver erros
// F12 > Console > Filtrar por "error"

// Ver network requests
// F12 > Network > Filtrar por "supabase"

// Limpar cache
// F12 > Application > Clear storage > Clear site data
```

## Exportar Dados do Supabase

### Via Interface
1. Table Editor > feedbacks
2. Botão "..." > Download as CSV

### Via SQL
```sql
-- Copiar resultados
SELECT * FROM feedbacks ORDER BY created_at;
-- Depois: Copy to clipboard
```

### Via API (curl)
```bash
curl 'https://abc123.supabase.co/rest/v1/feedbacks?select=*' \
  -H "apikey: SUA_CHAVE_AQUI" \
  -H "Authorization: Bearer SUA_CHAVE_AQUI"
```

## Performance

```bash
# Verificar tamanho do bundle
npm run build
ls -lh dist/assets/

# Analisar bundle (opcional)
npm install -D rollup-plugin-visualizer
# Adicionar em vite.config.ts e fazer build
```

## Backup

```bash
# Backup do código
git clone https://github.com/usuario/repo.git backup/

# Backup dos dados
# Exportar CSV do Supabase manualmente

# Backup das configurações
cp .env.local .env.backup
```

---

**Mantenha este arquivo aberto durante desenvolvimento!** 📌

Para mais detalhes, consulte a documentação completa nos arquivos MD.
