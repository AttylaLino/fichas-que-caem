# Perguntas Frequentes (FAQ) ❓

## Geral

### O que é o "Fichas que Caem"?

É um aplicativo web para coletar feedback anônimo em eventos de diversidade, equidade e inclusão. Os participantes enviam palavras ou frases curtas, que são agregadas em nuvens de palavras dinâmicas e atualizadas em tempo real.

### Precisa de login?

Não! O aplicativo é 100% anônimo. Não coletamos nomes, emails, IPs ou qualquer dado pessoal.

### É gratuito?

Sim, completamente gratuito e open-source (licença MIT).

### Funciona offline?

Não, é necessário conexão com internet para enviar feedbacks e visualizar as nuvens.

## Instalação

### Preciso saber programar?

Para usar: não. Apenas acesse o link.
Para instalar: conhecimento básico de terminal e Git ajuda, mas os guias são bem detalhados.

### Quanto custa hospedar?

- **GitHub Pages**: Gratuito
- **Supabase**: Plano gratuito é suficiente para a maioria dos eventos (até 50k requisições/mês)

### Funciona no celular?

Sim! O design é mobile-first e funciona perfeitamente em smartphones e tablets.

### Quais navegadores são suportados?

Todos os navegadores modernos:
- Chrome/Edge (recomendado)
- Firefox
- Safari
- Opera

## Uso

### Quantas pessoas podem usar ao mesmo tempo?

Depende do seu plano Supabase:
- **Gratuito**: ~100 conexões simultâneas (suficiente para a maioria dos eventos)
- **Pago**: Milhares de conexões

### Os feedbacks aparecem instantaneamente?

Sim! Graças ao Supabase Realtime, as nuvens atualizam em 1-2 segundos.

### Posso ter mais de 4 sessões?

Sim! Veja o guia de customização (CUSTOMIZACAO.md) para adicionar mais sessões.

### Posso editar ou deletar feedbacks?

Participantes não podem editar após enviar. Organizadores podem deletar via Supabase Table Editor.

### Posso moderar os feedbacks?

Sim, você pode:
1. Visualizar todos no Supabase Table Editor
2. Deletar feedbacks inadequados
3. Adicionar filtro de palavrões (veja CUSTOMIZACAO.md)

## Dados e Privacidade

### Que dados são coletados?

Apenas:
- Texto do feedback
- Número da sessão (1-4)
- Data/hora do envio

**Não coletamos**: IP, cookies, device ID, localização, ou qualquer identificador.

### Os dados são realmente anônimos?

Sim! Não há como vincular um feedback a uma pessoa específica.

### Onde os dados são armazenados?

No Supabase (PostgreSQL hospedado na AWS ou região escolhida por você).

### Posso exportar os dados?

Sim! No Supabase Table Editor, clique em "Download as CSV".

### Como deletar todos os dados após o evento?

No Supabase SQL Editor:
```sql
DELETE FROM feedbacks;
```

### O aplicativo está em conformidade com LGPD/GDPR?

Sim, pois:
- Não coleta dados pessoais identificáveis
- Não usa cookies de rastreamento
- Não compartilha dados com terceiros
- Organizador tem controle total dos dados

## Técnico

### Por que React + Vite?

- Build rápido
- Hot reload excelente
- TypeScript integrado
- Deploy simples

### Por que Supabase?

- Realtime nativo
- PostgreSQL robusto
- API REST automática
- Plano gratuito generoso
- Fácil de configurar

### Posso usar outro banco?

Tecnicamente sim, mas precisaria reescrever a camada de dados. Supabase é altamente recomendado.

### Como funciona o tempo real?

Supabase usa WebSockets para enviar atualizações instantâneas quando novos dados são inseridos.

### Posso hospedar em outro lugar além do GitHub Pages?

Sim! Funciona em:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- Qualquer host de static site

Basta ajustar o `base` no `vite.config.ts`.

### O código é open-source?

Sim! Licença MIT. Use, modifique e distribua livremente.

## Problemas Comuns

### "Variáveis de ambiente não encontradas"

Certifique-se de criar o arquivo `.env.local` com as credenciais do Supabase.

### Nuvem não atualiza automaticamente

1. Verifique se Realtime está habilitado:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE feedbacks;
   ```
2. Recarregue a página
3. Verifique o console do navegador (F12) para erros

### Deploy no GitHub Pages falha

1. Verifique Secrets nas configurações do repositório
2. Certifique-se que `base` no `vite.config.ts` está correto
3. Veja logs do GitHub Actions para detalhes

### Palavras não aparecem na nuvem

Possíveis causas:
1. São stopwords (veja lista em `textProcessing.ts`)
2. Têm menos de 3 caracteres
3. Contêm apenas números ou símbolos

### Erro "Failed to fetch"

1. Verifique URL do Supabase no `.env.local`
2. Verifique se a tabela `feedbacks` existe
3. Verifique se RLS está configurado corretamente

## Customização

### Posso mudar as cores?

Sim! Edite as variáveis CSS em `src/index.css`. Veja guia completo em CUSTOMIZACAO.md.

### Posso adicionar meu logo?

Sim! Veja exemplos em CUSTOMIZACAO.md.

### Posso traduzir para outro idioma?

Sim! Todos os textos estão nos componentes. Edite e substitua.

### Posso mudar o limite de caracteres?

Sim! Edite em `FeedbackForm.tsx` e no SQL. Veja CUSTOMIZACAO.md.

## Suporte e Comunidade

### Onde reportar bugs?

Abra uma issue no GitHub do projeto.

### Onde pedir ajuda?

1. Leia a documentação (README.md, INSTALACAO.md)
2. Verifique este FAQ
3. Abra uma issue com tag `question`

### Posso contribuir?

Sim! Veja CONTRIBUTING.md para diretrizes.

### Há uma comunidade?

Ainda não, mas fique à vontade para criar discussões no GitHub!

## Casos de Uso

### Funciona para eventos virtuais?

Sim! Compartilhe o link via Zoom, Teams, etc.

### Funciona para eventos híbridos?

Perfeitamente! Tanto presencial quanto remoto podem acessar.

### Posso usar em sala de aula?

Sim! Ótimo para coletar feedback de alunos de forma anônima.

### Posso usar em retrospectivas ágeis?

Sim! Adapte as sessões para diferentes momentos da retro.

### Funciona para conferências grandes?

Sim, mas verifique os limites do plano gratuito do Supabase (50k requests/mês). Para eventos muito grandes, considere plano pago.

## Performance

### Quantos feedbacks suporta?

Milhares! O PostgreSQL do Supabase é bem robusto.

### A nuvem fica lenta com muitos dados?

A biblioteca d3-cloud pode ficar mais lenta com 1000+ palavras únicas. Para eventos muito grandes, considere limitar exibição aos top 100-200.

### Como otimizar?

1. Adicione mais stopwords
2. Limite palavras exibidas na nuvem
3. Use índices no PostgreSQL (já incluídos no SQL)

## Eventos Futuros

### Posso reusar para outro evento?

Sim! Duas opções:
1. Limpar dados antigos (`DELETE FROM feedbacks`)
2. Criar novo projeto Supabase

### Como arquivar dados de eventos passados?

1. Exporte CSV do Supabase
2. Delete do banco
3. Guarde o CSV para análises futuras

### Posso ter múltiplos eventos simultâneos?

Sim, mas precisaria adicionar campo `event_id` na tabela e modificar a lógica. Ou crie projetos Supabase separados.

---

**Não encontrou sua resposta?**

Abra uma issue no GitHub com a tag `question` ou consulte a documentação completa.

🌈 **Todas as perguntas são bem-vindas!** ✨
