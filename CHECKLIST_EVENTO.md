# Checklist para o Dia do Evento ✅

Use este checklist para garantir que tudo está funcionando perfeitamente no dia do seu evento.

## 1 Semana Antes

- [ ] **Deploy está funcionando**
  - [ ] Acesse o site em produção
  - [ ] Teste todas as 4 sessões
  - [ ] Verifique se as URLs estão corretas

- [ ] **Supabase configurado**
  - [ ] Tabela `feedbacks` criada
  - [ ] RLS habilitado e testado
  - [ ] Realtime funcionando
  - [ ] Verifique limites do plano (50k requests/mês no gratuito)

- [ ] **Links preparados**
  - [ ] Links diretos para cada sessão salvos
  - [ ] Links para resultados salvos
  - [ ] QR Codes gerados (opcional)

- [ ] **Materiais de divulgação**
  - [ ] Slides com instruções
  - [ ] Mensagens para compartilhar no chat
  - [ ] Posts para redes sociais (se aplicável)

## 1 Dia Antes

- [ ] **Teste final completo**
  - [ ] Envie feedbacks de teste em todas as sessões
  - [ ] Verifique se aparecem nas nuvens
  - [ ] Teste em diferentes dispositivos (mobile, desktop, tablet)
  - [ ] Teste em diferentes navegadores

- [ ] **Limpar dados de teste**
  ```sql
  DELETE FROM feedbacks;
  ```

- [ ] **Preparar equipamentos**
  - [ ] Computador/tablet para projeção
  - [ ] Carregadores
  - [ ] Cabos HDMI/adaptadores
  - [ ] Hotspot mobile (backup)

- [ ] **Plano B**
  - [ ] Post-its e canetas
  - [ ] Flipchart ou quadro
  - [ ] Link alternativo (Google Forms, Mentimeter)

## Manhã do Evento

- [ ] **Verificação rápida**
  - [ ] Site está no ar
  - [ ] Supabase funcionando
  - [ ] Internet estável
  - [ ] Equipamento de projeção testado

- [ ] **Links prontos para compartilhar**
  - [ ] Copiar links em lugar de fácil acesso
  - [ ] QR Codes prontos (se usar)
  - [ ] Mensagens prontas para copiar/colar

- [ ] **Preparar ambiente**
  - [ ] Abrir páginas de resultados em abas separadas
  - [ ] Testar modo tela cheia
  - [ ] Volume adequado (se houver áudio)
  - [ ] Zoom/tamanho de tela ajustado

## Durante o Evento

### Antes de Cada Sessão

- [ ] **Abrir página de coleta correta**
  - [ ] Verificar número da sessão
  - [ ] Testar o formulário rapidamente

- [ ] **Compartilhar com participantes**
  - [ ] Mostrar URL no telão
  - [ ] Enviar link no chat
  - [ ] Mostrar QR Code (se aplicável)
  - [ ] Explicar como funciona (2 min)

### Durante a Coleta (3-5 minutos)

- [ ] **Monitorar chegada de dados**
  - [ ] Abrir Supabase Table Editor em aba separada
  - [ ] Ver se feedbacks estão chegando
  - [ ] Estar pronto para troubleshooting

- [ ] **Encorajar participação**
  - [ ] "Já temos X contribuições!"
  - [ ] "Não há respostas certas ou erradas"
  - [ ] "Todas as vozes são importantes"

### Após a Coleta

- [ ] **Abrir página de resultados**
  - [ ] Trocar para aba de resultados
  - [ ] Ativar modo tela cheia (botão ⤢)
  - [ ] Aguardar nuvem carregar completamente

- [ ] **Facilitar discussão**
  - [ ] Comentar palavras frequentes
  - [ ] Destacar diversidade de perspectivas
  - [ ] Conectar com o conteúdo da sessão

- [ ] **Tirar screenshot (opcional)**
  - [ ] Print da nuvem para relatório
  - [ ] Compartilhar depois com participantes

## Troubleshooting Rápido

### Site não carrega

1. Verificar conexão internet
2. Tentar outro navegador
3. Limpar cache (Ctrl+Shift+Delete)
4. Ativar plano B (post-its)

### Feedbacks não aparecem

1. Recarregar página (F5)
2. Verificar Supabase dashboard
3. Verificar console do navegador (F12)
4. Se persistir, pular para próxima sessão

### Projeção com problema

1. Verificar cabos
2. Reiniciar equipamento
3. Usar outro dispositivo
4. Compartilhar tela via Zoom/Teams

### Internet instável

1. Usar hotspot mobile
2. Pedir para participantes usarem dados móveis
3. Ativar plano B (física/alternativa)

## Frases Prontas

### Ao Introduzir

> "Agora vamos usar o 'Fichas que Caem' para coletar suas percepções. Acesse o link que está no chat e no telão. É anônimo e leva menos de 1 minuto. Compartilhe palavras, frases curtas ou sentimentos sobre o que discutimos."

### Durante a Coleta

> "Já temos [X] contribuições! Continue compartilhando suas reflexões. Não há respostas certas ou erradas. Todas as perspectivas são válidas e importantes."

### Ao Mostrar Resultados

> "Olha só que interessante! A palavra '[palavra]' apareceu [X] vezes. Como isso se conecta com nossa discussão? Vejam a diversidade de perspectivas aqui representada."

### Ao Agradecer

> "Obrigado por compartilhar suas vozes! Esta nuvem reflete nossa jornada coletiva e a riqueza de nossas diferentes experiências e perspectivas."

## Após o Evento

- [ ] **Exportar dados**
  - [ ] Baixar CSV do Supabase
  - [ ] Salvar screenshots das nuvens
  - [ ] Organizar em pasta do evento

- [ ] **Análise (se aplicável)**
  - [ ] Identificar temas principais
  - [ ] Comparar entre sessões
  - [ ] Incluir insights no relatório

- [ ] **Compartilhar com participantes**
  - [ ] Enviar screenshots por email
  - [ ] Postar em redes sociais
  - [ ] Incluir em apresentação de síntese

- [ ] **Limpar dados (opcional)**
  ```sql
  DELETE FROM feedbacks WHERE session_id IN (1,2,3,4);
  ```

- [ ] **Feedback sobre a ferramenta**
  - [ ] O que funcionou bem?
  - [ ] O que pode melhorar?
  - [ ] Ideias para próximos eventos

- [ ] **Agradecer equipe**
  - [ ] Reconhecer quem ajudou
  - [ ] Compartilhar aprendizados

## Contatos de Emergência

**Suporte Técnico**
- Pessoa: _______________
- Tel: _________________
- Email: _______________

**Suporte Supabase**
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs

**Plano B**
- Pessoa responsável: _______________
- Materiais backup: _______________

## Notas Pessoais

Use este espaço para anotações específicas do seu evento:

---

---

---

---

## Métricas para Acompanhar

- [ ] Total de participantes no evento: _______
- [ ] Total de feedbacks coletados: _______
- [ ] Sessão com mais participação: _______
- [ ] Palavras mais frequentes: _____________
- [ ] Taxa de participação: ______%

## Aprendizados

O que funcionou bem:

---

---

O que pode melhorar:

---

---

Ideias para próxima vez:

---

---

---

**Lembre-se**: O mais importante é criar um espaço acolhedor onde todas as vozes sejam ouvidas e valorizadas. A tecnologia é apenas uma ferramenta para facilitar isso. 🌈✨

**Bom evento!** 🎉
