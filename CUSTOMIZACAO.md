# Exemplos de Customização 🎨

## Personalizando o Visual

### 1. Mudar a Paleta de Cores

Edite `src/index.css`:

```css
:root {
  /* Exemplo: Paleta Pastel */
  --rainbow-red: #ffb3ba;
  --rainbow-orange: #ffdfba;
  --rainbow-yellow: #ffffba;
  --rainbow-green: #baffc9;
  --rainbow-blue: #bae1ff;
  --rainbow-indigo: #d4baff;
  --rainbow-violet: #ffb3ff;
  --rainbow-pink: #ffc9e8;
}
```

```css
:root {
  /* Exemplo: Paleta Neon */
  --rainbow-red: #ff006e;
  --rainbow-orange: #ff7900;
  --rainbow-yellow: #ffff00;
  --rainbow-green: #39ff14;
  --rainbow-blue: #00d9ff;
  --rainbow-indigo: #9d00ff;
  --rainbow-violet: #ff00ff;
  --rainbow-pink: #ff69b4;
}
```

### 2. Alterar Fonte

Edite `src/index.css`:

```css
body {
  font-family: 'Montserrat', 'Inter', sans-serif;
}
```

E adicione no `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
```

### 3. Mudar Bordas e Raios

Edite `src/index.css`:

```css
:root {
  /* Exemplo: Mais Angular */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Exemplo: Mais Arredondado */
  --radius-sm: 16px;
  --radius-md: 24px;
  --radius-lg: 32px;
}
```

## Personalizando Textos

### 1. Mudar o Título Principal

Edite `src/pages/SessionPage.tsx`:

```tsx
<h1 className="main-title slide-down">
  Seu Título Personalizado Aqui!
</h1>
```

### 2. Customizar Placeholders

Edite `src/components/FeedbackForm.tsx`:

```tsx
<textarea
  placeholder="Digite suas ideias, sentimentos ou reflexões..."
/>
```

### 3. Alterar Texto do Botão

Edite `src/components/FeedbackForm.tsx`:

```tsx
<button type="submit">
  Enviar minha contribuição ✨
</button>
```

### 4. Personalizar Mensagem de Sucesso

Edite `src/components/FeedbackForm.tsx`:

```tsx
<p>Contribuição recebida! Obrigado por participar!</p>
```

## Customizando Funcionalidades

### 1. Alterar Limite de Caracteres

**Frontend** - Edite `src/components/FeedbackForm.tsx`:

```tsx
const remainingChars = 1000 - text.length; // Era 500

<textarea
  maxLength={1000} // Era 500
/>
```

**Backend** - Edite `supabase-setup.sql`:

```sql
text TEXT NOT NULL CHECK (char_length(text) <= 1000)
```

### 2. Adicionar Mais Sessões (ex: 6 sessões)

**1. SQL** - Edite `supabase-setup.sql`:

```sql
session_id INTEGER NOT NULL CHECK (session_id >= 1 AND session_id <= 6)
```

**2. Validação** - Edite `src/pages/SessionPage.tsx` e `ResultsPage.tsx`:

```tsx
if (isNaN(sessionNumber) || sessionNumber < 1 || sessionNumber > 6) {
```

**3. Home** - Edite `src/pages/HomePage.tsx`:

```tsx
const sessions = [1, 2, 3, 4, 5, 6];
```

### 3. Remover/Adicionar Stopwords

Edite `src/utils/textProcessing.ts`:

```typescript
export const STOPWORDS_PT = new Set([
  // Remover palavras comuns do seu contexto
  'exemplo',
  'teste',
  
  // Adicionar palavras que você quer ignorar
  'palavra1',
  'palavra2',
  
  // ... resto das stopwords
]);
```

### 4. Alterar Tamanho das Palavras na Nuvem

Edite `src/components/WordCloudDisplay.tsx`:

```typescript
const options = {
  fontSizes: [30, 150] as [number, number], // Era [20, 100]
  // Palavras maiores e mais dramáticas
};
```

```typescript
const options = {
  fontSizes: [16, 60] as [number, number], // Era [20, 100]
  // Palavras menores e mais discretas
};
```

### 5. Mudar Cores da Nuvem

Edite `src/components/WordCloudDisplay.tsx`:

```typescript
const options = {
  colors: [
    '#2c3e50', // azul escuro
    '#34495e', // cinza
    '#7f8c8d', // cinza claro
    '#95a5a6', // cinza mais claro
  ],
  // Paleta monocromática
};
```

### 6. Alterar Animação de Transição

Edite `src/components/WordCloudDisplay.tsx`:

```typescript
const options = {
  transitionDuration: 2000, // Era 1000 (mais lento)
};
```

## Customizando Layout

### 1. Mudar Layout da Home

Edite `src/pages/HomePage.css`:

```css
/* Layout em linha (ao invés de grid) */
.session-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
```

### 2. Alterar Largura Máxima

Edite os arquivos CSS relevantes:

```css
.feedback-form-container {
  max-width: 800px; /* Era 600px - mais largo */
}
```

```css
.wordcloud-container {
  max-width: 1600px; /* Era 1200px - mais largo */
}
```

### 3. Remover Formas Flutuantes

Edite qualquer arquivo de página CSS:

```css
.floating-shapes {
  display: none; /* Remove as formas animadas */
}
```

## Adicionando Funcionalidades

### 1. Adicionar Logo/Imagem

Edite `src/pages/HomePage.tsx`:

```tsx
<div className="home-header">
  <img src="/logo.png" alt="Logo do Evento" className="event-logo" />
  <h1 className="home-title slide-down">
    Fichas que Caem
  </h1>
</div>
```

E em `HomePage.css`:

```css
.event-logo {
  max-width: 200px;
  margin-bottom: var(--spacing-lg);
}
```

### 2. Adicionar Contagem Regressiva

Crie um novo componente `Countdown.tsx`:

```tsx
import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return <div className="countdown">{timeLeft}</div>;
}
```

### 3. Adicionar Rodapé com Créditos

Edite qualquer página:

```tsx
<footer className="page-footer">
  <p>Evento organizado por [Seu Nome/Organização]</p>
  <p>Desenvolvido com 💜 para promover diversidade e inclusão</p>
</footer>
```

### 4. Adicionar Filtro de Palavrões

Edite `src/utils/textProcessing.ts`:

```typescript
const BLOCKED_WORDS = new Set([
  'palavrao1',
  'palavrao2',
  // ... adicione conforme necessário
]);

export function containsBlockedWords(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/);
  return words.some(word => BLOCKED_WORDS.has(word));
}
```

E em `FeedbackForm.tsx`:

```tsx
import { containsBlockedWords } from '../utils/textProcessing';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (containsBlockedWords(text)) {
    setError('Por favor, use linguagem respeitosa.');
    return;
  }
  
  // ... resto do código
};
```

## Temas Pré-configurados

### Tema: Corporativo Minimalista

**Cores** (index.css):
```css
:root {
  --rainbow-red: #0066cc;
  --rainbow-orange: #0052a3;
  --rainbow-yellow: #003d7a;
  --rainbow-green: #005a9e;
  --rainbow-blue: #0077cc;
  --rainbow-indigo: #004c8c;
  --rainbow-violet: #0091d5;
  --rainbow-pink: #00aaff;
}
```

### Tema: Natureza

**Cores** (index.css):
```css
:root {
  --rainbow-red: #a8dadc;
  --rainbow-orange: #f1faee;
  --rainbow-yellow: #e9c46a;
  --rainbow-green: #2a9d8f;
  --rainbow-blue: #457b9d;
  --rainbow-indigo: #1d3557;
  --rainbow-violet: #a8dadc;
  --rainbow-pink: #f1faee;
}
```

### Tema: Alto Contraste (Acessibilidade)

**Cores** (index.css):
```css
:root {
  --rainbow-red: #000000;
  --rainbow-orange: #1a1a1a;
  --rainbow-yellow: #333333;
  --rainbow-green: #000000;
  --rainbow-blue: #1a1a1a;
  --rainbow-indigo: #333333;
  --rainbow-violet: #000000;
  --rainbow-pink: #1a1a1a;
  
  --bg-primary: #ffffff;
  --text-primary: #000000;
}
```

## Dicas de Customização

### Testando Mudanças

1. Sempre teste localmente antes de fazer deploy
2. Use `npm run dev` para ver mudanças em tempo real
3. Teste em diferentes dispositivos (mobile, tablet, desktop)
4. Teste em diferentes navegadores (Chrome, Firefox, Safari)

### Mantendo Acessibilidade

Ao customizar, certifique-se de manter:
- Contraste mínimo de 4.5:1 para texto
- Fontes legíveis (mínimo 16px)
- Navegação por teclado funcionando
- ARIA labels preservados

### Versionamento

Se fizer mudanças significativas:
```bash
git add .
git commit -m "feat: adicionar logo e countdown"
git push
```

### Backups

Antes de grandes mudanças:
```bash
git branch minha-customizacao
git checkout minha-customizacao
# Faça suas mudanças aqui
```

## Recursos Adicionais

### Ícones

Use bibliotecas como:
- React Icons: `npm install react-icons`
- Lucide React: `npm install lucide-react`

### Fontes

Explore Google Fonts:
- https://fonts.google.com

### Paletas de Cores

Geradores úteis:
- https://coolors.co
- https://colorhunt.co
- https://mycolor.space

### Inspiração de Design

- https://dribbble.com
- https://awwwards.com
- https://ui-patterns.com

---

**Divirta-se customizando!** 🎨✨

Lembre-se: mantenha sempre o foco em inclusão, acessibilidade e experiência do usuário.
