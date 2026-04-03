# Guia de Uso Durante o Evento 🎪

## Para Organizadores

### Antes do Evento

1. **Testar o aplicativo**:
   - Acesse todas as 4 sessões
   - Envie feedbacks de teste
   - Verifique se as nuvens de palavras funcionam
   - Teste em diferentes dispositivos (celular, tablet, desktop)

2. **Preparar links diretos**:
   - Sessão 1: `https://seu-site.github.io/fichas-que-caem/sessao/1`
   - Sessão 2: `https://seu-site.github.io/fichas-que-caem/sessao/2`
   - Sessão 3: `https://seu-site.github.io/fichas-que-caem/sessao/3`
   - Sessão 4: `https://seu-site.github.io/fichas-que-caem/sessao/4`

3. **Criar QR Codes** (opcional):
   - Use um gerador de QR Code online
   - Crie um QR Code para cada sessão
   - Imprima e distribua ou mostre no telão

4. **Preparar projeção**:
   - Resultados Sessão 1: `https://seu-site.github.io/fichas-que-caem/sessao/1/resultados`
   - Resultados Sessão 2: `https://seu-site.github.io/fichas-que-caem/sessao/2/resultados`
   - Etc.

### Durante o Evento

#### Momento 1: Início da Sessão

1. **Compartilhe o link ou QR Code** da sessão atual
2. **Oriente os participantes**:
   > "Acesse o link e compartilhe suas primeiras impressões, palavras-chave ou sentimentos sobre o que discutimos até aqui. Não há respostas certas ou erradas!"

3. **Dê 3-5 minutos** para os participantes enviarem

#### Momento 2: Visualização Coletiva

1. **Abra a página de resultados** no telão
2. **Ative o modo tela cheia** (botão ⤢)
3. **Deixe a nuvem visível** enquanto novos feedbacks chegam
4. **Comente as palavras** que aparecem com mais frequência
5. **Promova discussão**:
   > "Vejo que a palavra 'acolhimento' aparece muito. Como isso se conecta com nossa conversa?"

#### Momento 3: Transição

1. **Faça uma ponte** entre a nuvem e o próximo tópico
2. **Agradeça a participação** e destaque a pluralidade de vozes

### Dicas de Facilitação

- **Incentive diversidade**: "Não apenas concordâncias, queremos ouvir todas as perspectivas"
- **Mantenha segurança**: "Este é um espaço anônimo e seguro"
- **Celebre diferenças**: Quando aparecerem palavras contrastantes, celebre a diversidade de pensamentos
- **Não force**: Alguns participantes podem só observar, e tudo bem

### Sugestões de Prompts por Sessão

#### Sessão 1 - Abertura
> "Compartilhe uma palavra ou frase que representa sua expectativa para hoje"
> "O que diversidade significa para você?"

#### Sessão 2 - Meio do Evento
> "Qual aprendizado ou insight você teve até agora?"
> "Uma palavra que descreve como você está se sentindo"

#### Sessão 3 - Aprofundamento
> "Que desafios você identifica no tema que discutimos?"
> "O que te inspira a agir?"

#### Sessão 4 - Encerramento
> "O que você vai levar deste encontro?"
> "Um compromisso que você faz consigo mesmo"

## Para Participantes

### Como Participar

1. **Acesse o link** compartilhado pelo organizador
2. **Leia o prompt** na tela
3. **Escreva livremente**:
   - Palavras-chave
   - Frases curtas
   - Sentimentos
   - Reflexões
4. **Clique em "Soltar minha ficha 🎲"**
5. **Pronto!** Sua contribuição é anônima

### O que Escrever

- Não há respostas certas ou erradas
- Pode ser uma palavra só ou várias
- Pode ser um sentimento, um aprendizado, uma dúvida
- Seja autêntico e honesto
- Respeite a diversidade de pensamentos

### Dicas

- Use **palavras significativas** (evite "e", "o", "a", etc.)
- Seja **específico**: em vez de "bom", que tal "inspirador"?
- **Não se repita** muito na mesma contribuição
- Você pode enviar **quantas vezes quiser**
- Suas palavras aparecerão na **nuvem coletiva**

### Privacidade

- **100% anônimo**: Não coletamos nome, email ou IP
- **Sem rastreamento**: Suas palavras se misturam com as dos outros
- **Seguro**: Hospedado em plataforma confiável

## Exemplos de Uso

### Exemplo 1: Workshop de DEI

**Contexto**: Workshop de 4 horas sobre diversidade no ambiente de trabalho

- **Sessão 1** (9h): Check-in inicial - "Como você está chegando?"
- **Sessão 2** (10h30): Após dinâmica - "O que te surpreendeu?"
- **Sessão 3** (14h): Discussão de casos - "Que desafios você identifica?"
- **Sessão 4** (16h30): Encerramento - "Que ação você vai tomar?"

### Exemplo 2: Palestra com Público Grande

**Contexto**: Palestra de 90 minutos sobre inclusão

- **Sessão 1**: Início - "Uma palavra que descreve sua relação com o tema"
- **Sessão 2**: Meio - "Qual conceito novo você aprendeu?"
- **Sessão 3**: Q&A - "Sua principal dúvida"
- **Sessão 4**: Fim - "Como você vai aplicar isso?"

### Exemplo 3: Série de Encontros

**Contexto**: 4 encontros mensais sobre equidade

- **Sessão 1**: Encontro 1 - Tema X
- **Sessão 2**: Encontro 2 - Tema Y
- **Sessão 3**: Encontro 3 - Tema Z
- **Sessão 4**: Encontro 4 - Síntese e próximos passos

## Acessibilidade

- **Mobile-friendly**: Funciona bem em celulares
- **Texto legível**: Fonte grande e clara
- **Cores acessíveis**: Bom contraste
- **Navegação simples**: Poucos cliques necessários

## Dados e Privacidade

### O que é Coletado

- Texto do feedback
- Número da sessão
- Data/hora do envio
- **Nada mais**: Sem IP, cookies, nome, email, etc.

### Retenção de Dados

- Dados ficam no Supabase do organizador
- Organizador pode deletar a qualquer momento
- Recomendamos excluir após o evento se não for usar mais

### Exclusão de Dados

Para limpar todos os feedbacks após o evento:

```sql
-- Execute no SQL Editor do Supabase
DELETE FROM feedbacks WHERE created_at < NOW();
```

## Troubleshooting no Evento

### "Não consigo acessar o link"

- Verifique se o link está correto
- Tente recarregar a página
- Teste em outro navegador ou dispositivo

### "Meu feedback não aparece"

- Verifique se clicou em "Soltar minha ficha"
- Aguarde 2-3 segundos e recarregue a página de resultados
- Se persistir, avise o organizador

### "A nuvem não atualiza"

- Recarregue a página (F5)
- Verifique sua conexão com a internet
- Verifique se o Realtime está habilitado no Supabase

## Suporte Técnico Durante o Evento

Tenha sempre um plano B:

- **Backup físico**: Post-its e canetas
- **Backup digital**: Google Forms ou Mentimeter
- **Pessoa de suporte**: Alguém monitore o console/Supabase

## Após o Evento

### Análise dos Dados

1. Acesse o Supabase Table Editor
2. Exporte os dados (botão "Download as CSV")
3. Analise no Excel, Google Sheets, etc.
4. Crie relatórios ou visualizações complementares

### Compartilhamento

- Tire screenshots das nuvens de palavras
- Inclua no relatório do evento
- Compartilhe insights com participantes
- Use como insumo para próximos eventos

### Limpeza

Se não for usar mais os dados:

```sql
DELETE FROM feedbacks;
```

---

**Lembre-se**: O objetivo é criar um espaço acolhedor onde todas as vozes sejam ouvidas e valorizadas. 🌈✨

**Boa facilitação!** 🎉
