# Guia Rápido de Instalação 🚀

## Pré-requisitos (WSL/Linux)

Antes de começar, certifique-se de ter instalado:

### 1. WSL2 (se estiver no Windows)
```bash
# No PowerShell (como Administrador):
wsl --install

# Reinicie o computador
# Após reiniciar, configure seu usuário Ubuntu
```

### 2. Node.js e npm
```bash
# Atualizar repositórios
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (versão LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalação
node --version  # Deve mostrar v20.x.x
npm --version   # Deve mostrar 10.x.x
```

### 3. Git
```bash
# Instalar Git
sudo apt install -y git

# Configurar Git (substitua com seus dados)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"

# Verificar
git --version
```

### 4. Editor de Texto (Opcional)
```bash
# Opção 1: VS Code (recomendado para WSL)
# Baixe e instale do site: https://code.visualstudio.com
# Instale a extensão "WSL" no VS Code

# Opção 2: Nano (editor simples no terminal)
sudo apt install -y nano

# Opção 3: Vim (se preferir)
sudo apt install -y vim
```

## Passo 1: Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Crie um novo projeto (escolha uma região próxima)
3. Aguarde a criação do projeto (1-2 minutos)
4. Vá em **SQL Editor** (menu lateral)
5. Clique em **New query**
6. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
7. Clique em **Run** (canto inferior direito)
8. Aguarde a mensagem "Success. No rows returned"

## Passo 2: Obter as Credenciais

1. Vá em **Project Settings** (ícone de engrenagem no menu lateral)
2. Clique em **API** no menu lateral
3. Copie os seguintes valores:
   - **Project URL** (exemplo: https://abc123.supabase.co)
   - **anon public** key (uma string longa começando com "eyJ...")

## Passo 3: Baixar e Configurar o Projeto

### Opção A: Clonar do GitHub (se você já fez upload)
```bash
# Navegar para sua pasta de projetos
cd ~
mkdir -p projetos
cd projetos

# Clonar o repositório
git clone https://github.com/SEU-USUARIO/fichas-que-caem.git
cd fichas-que-caem
```

### Opção B: Usar projeto local (se ainda não fez upload)
```bash
# Navegar até a pasta do projeto
cd /mnt/c/Users/SEU-USUARIO/caminho/para/fichas-que-caem

# Ou se já está no WSL:
cd ~/projetos/fichas-que-caem
```

### Configurar Variáveis de Ambiente

1. **Criar arquivo `.env.local`**:
   ```bash
   # Copiar do exemplo
   cp .env.example .env.local
   ```

2. **Editar o arquivo** (escolha um editor):
   
   **Opção 1: Nano (mais simples)**
   ```bash
   nano .env.local
   ```
   - Cole suas credenciais do Supabase
   - Pressione `Ctrl+X`, depois `Y`, depois `Enter` para salvar
   
   **Opção 2: Vim**
   ```bash
   vim .env.local
   ```
   - Pressione `i` para entrar no modo de inserção
   - Cole suas credenciais
   - Pressione `Esc`, digite `:wq` e pressione `Enter`
   
   **Opção 3: VS Code**
   ```bash
   code .env.local
   ```
   - Edite e salve normalmente

3. **Conteúdo do `.env.local`**:
   ```env
   VITE_SUPABASE_URL=https://abc123.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...sua-chave-aqui...
   ```

4. **Verificar se foi criado**:
   ```bash
   ls -la | grep .env.local
   # Deve mostrar o arquivo
   ```

## Passo 4: Instalar Dependências e Executar

### Instalar Dependências
```bash
# Certifique-se de estar na pasta do projeto
pwd  # Deve mostrar .../fichas-que-caem

# Instalar todas as dependências
npm install

# Aguarde... pode levar 1-3 minutos
# Você verá várias linhas de download
```

### Executar em Modo Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Você verá algo como:
#   VITE v5.0.8  ready in 500 ms
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
```

### Acessar o Aplicativo

**No WSL:**
- Abra seu navegador (Chrome, Firefox, Edge)
- Digite: `http://localhost:5173`
- O aplicativo deve carregar normalmente

**Dica WSL:** O WSL2 compartilha automaticamente a rede com o Windows, então localhost funciona direto!

### Manter o Servidor Rodando
```bash
# O servidor fica rodando no terminal
# Para parar: Pressione Ctrl+C
# Para rodar novamente: npm run dev
```

### Testar em Segundo Plano (Opcional)
```bash
# Rodar em background
npm run dev &

# Ver processos rodando
ps aux | grep vite

# Matar processo depois (se necessário)
pkill -f vite
```

## Passo 5: Testar o Aplicativo

### Teste Básico
1. **Acesse** `http://localhost:5173` no navegador
2. **Clique** em "Enviar feedback" na Sessão 1
3. **Digite** algo como "aprendizado inclusão diversidade"
4. **Clique** em "Soltar minha ficha 🎲"
5. **Aguarde** a animação de sucesso
6. **Clique** em "Ver nuvem de palavras desta sessão"
7. **Verifique** se as palavras aparecem na nuvem!

### Teste de Tempo Real
1. Abra o aplicativo em **duas abas** do navegador
2. Na **primeira aba**: vá para resultados da sessão 1
3. Na **segunda aba**: vá para coleta da sessão 1
4. **Envie** um feedback na segunda aba
5. **Observe** a primeira aba atualizar automaticamente!

### Verificar Logs (se algo der errado)
```bash
# Ver logs do terminal onde rodou npm run dev
# Procure por erros em vermelho

# Abrir console do navegador
# Pressione F12 > Console
# Veja se há erros (em vermelho)
```

## Deploy no GitHub Pages

### Pré-requisito: Configurar SSH (Recomendado)

**Opção 1: Usar HTTPS (mais simples, mas pede senha)**
```bash
# Nada a configurar, use HTTPS nos comandos git
```

**Opção 2: Usar SSH (recomendado, sem senha)**
```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu.email@example.com"
# Pressione Enter 3 vezes (sem senha)

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# Adicionar no GitHub:
# 1. Vá em: https://github.com/settings/keys
# 2. Clique em "New SSH key"
# 3. Cole a chave e salve
```

### Configuração do Repositório

**1. Criar repositório no GitHub** (interface web):
```
- Acesse github.com e faça login
- Clique em "+" (canto superior direito) > "New repository"
- Nome sugerido: fichas-que-caem
- Deixe público
- NÃO marque nenhuma opção (README, .gitignore, etc.)
- Clique em "Create repository"
```

**2. Preparar o projeto localmente**:
```bash
# Certifique-se de estar na pasta do projeto
cd ~/projetos/fichas-que-caem

# Inicializar Git (se ainda não foi)
git init

# Verificar status
git status

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Aplicativo Fichas que Caem - versão inicial"

# Verificar se commitou
git log --oneline
```

**3. Conectar ao GitHub e fazer upload**:

**HTTPS (mais simples):**
```bash
# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/fichas-que-caem.git

# Renomear branch para main
git branch -M main

# Push (vai pedir usuário e senha)
git push -u origin main
```

**SSH (sem senha):**
```bash
# Adicionar remote
git remote add origin git@github.com:SEU-USUARIO/fichas-que-caem.git

# Renomear branch para main
git branch -M main

# Push
git push -u origin main
```

**4. Configurar Secrets no GitHub**:
```
1. No seu repositório, vá em: Settings > Secrets and variables > Actions
2. Clique em "New repository secret"
3. Adicionar PRIMEIRO secret:
   - Name: VITE_SUPABASE_URL
   - Secret: sua-url-do-supabase (ex: https://abc123.supabase.co)
   - Clique em "Add secret"
4. Adicionar SEGUNDO secret:
   - Name: VITE_SUPABASE_ANON_KEY
   - Secret: sua-chave-anonima-completa (eyJ...)
   - Clique em "Add secret"
```

**5. Atualizar vite.config.ts**:
```bash
# Abrir arquivo
nano vite.config.ts

# Encontrar a linha:
# base: '/fichas-que-caem/',

# Alterar para o nome do SEU repositório
# Se seu repo se chama "meu-app":
# base: '/meu-app/',

# Salvar: Ctrl+X, Y, Enter

# Commitar mudança
git add vite.config.ts
git commit -m "Atualizar base path para GitHub Pages"
git push
```

**6. Habilitar GitHub Pages**:
```
1. No GitHub, vá em: Settings > Pages
2. Em "Build and deployment" > "Source"
3. Selecione: "GitHub Actions"
4. Aguarde 2-3 minutos
5. Vá em "Actions" (aba do topo) para ver o deploy
```

**7. Acessar o site**:
```
URL: https://SEU-USUARIO.github.io/fichas-que-caem/

Exemplo: https://joaosilva.github.io/fichas-que-caem/
```

## Verificar se Está Funcionando

### No Supabase

1. Vá em **Table Editor** > **feedbacks**
2. Você deve ver os registros que enviou
3. A tabela deve ter as colunas: `id`, `session_id`, `text`, `created_at`

### No App

1. Abra o aplicativo
2. Envie alguns feedbacks
3. A nuvem de palavras deve atualizar automaticamente
4. Abra em outra aba e envie mais feedbacks
5. A primeira aba deve atualizar em tempo real!

## Problemas Comuns (WSL/Linux)

### "npm: command not found"
```bash
# Node.js não está instalado
# Volte aos pré-requisitos e instale Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### "Permission denied" ao instalar
```bash
# NÃO use sudo com npm install
# Se deu erro, limpe e tente novamente:
rm -rf node_modules package-lock.json
npm install
```

### "Erro ao enviar feedback"
```bash
# 1. Verificar .env.local
cat .env.local
# Deve mostrar suas credenciais

# 2. Verificar se executou SQL no Supabase
# Vá no Supabase e confira a tabela feedbacks

# 3. Ver logs detalhados
# Abra F12 no navegador > Console
```

### "Nenhuma ficha solta ainda"
```bash
# 1. Envie um feedback primeiro
# 2. Verifique no Supabase Table Editor
# 3. Recarregue a página (Ctrl+R)
# 4. Veja console do navegador para erros
```

### "Address already in use" (porta ocupada)
```bash
# Porta 5173 já está em uso
# Matar processo:
pkill -f vite

# Ou encontrar e matar manualmente:
lsof -ti:5173 | xargs kill -9

# Tentar novamente:
npm run dev
```

### Git pede senha toda hora (HTTPS)
```bash
# Configurar cache de credenciais
git config --global credential.helper cache

# Cache por 1 hora (3600 segundos)
git config --global credential.helper 'cache --timeout=3600'

# Ou configure SSH (veja seção de Deploy)
```

### GitHub Actions falha
```bash
# 1. Verificar Secrets no GitHub
# Settings > Secrets and variables > Actions
# Devem existir: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY

# 2. Verificar base path
cat vite.config.ts | grep base
# Deve ser: base: '/nome-do-seu-repo/',

# 3. Ver logs do Actions
# Aba Actions no GitHub > Clique no workflow > Ver detalhes
```

### "Cannot find module" ao rodar
```bash
# Dependências não instaladas ou corrompidas
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### WSL fica lento
```bash
# 1. Alocar mais memória para WSL
# Criar/editar: C:\Users\SEU-USUARIO\.wslconfig
# Adicionar:
# [wsl2]
# memory=4GB
# processors=2

# 2. Reiniciar WSL
# No PowerShell:
wsl --shutdown
# Abrir WSL novamente

# 3. Otimizar npm
npm config set prefer-offline true
npm config set progress false
```

### Não consegue editar arquivos do Windows no WSL
```bash
# Acessar arquivos do Windows:
cd /mnt/c/Users/SEU-USUARIO/Desktop/projetos

# Melhor prática: manter projetos dentro do WSL
mkdir -p ~/projetos
cd ~/projetos
# Desenvolver aqui é mais rápido
```

## Comandos Úteis (WSL/Linux)

### NPM e Desenvolvimento
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Testar build localmente
npm run preview

# Ver erros de TypeScript
npm run lint

# Limpar tudo e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Git
```bash
# Ver status
git status

# Ver diferenças
git diff

# Adicionar arquivos
git add .
git add arquivo.txt

# Commitar
git commit -m "mensagem"

# Push
git push

# Pull (baixar mudanças)
git pull

# Ver histórico
git log --oneline

# Ver branches
git branch
```

### Navegação e Arquivos
```bash
# Onde estou?
pwd

# Listar arquivos
ls -la

# Mudar de pasta
cd nome-da-pasta
cd ..              # Voltar
cd ~               # Home
cd -               # Pasta anterior

# Criar pasta
mkdir nova-pasta
mkdir -p pasta/subpasta

# Copiar arquivo
cp arquivo.txt copia.txt

# Mover/renomear
mv arquivo.txt novo-nome.txt

# Deletar arquivo (CUIDADO!)
rm arquivo.txt

# Deletar pasta (CUIDADO!)
rm -rf pasta/

# Ver conteúdo de arquivo
cat arquivo.txt
less arquivo.txt   # Navegável
head arquivo.txt   # 10 primeiras linhas
tail arquivo.txt   # 10 últimas linhas
```

### Processos
```bash
# Ver processos do npm/vite
ps aux | grep vite

# Matar processo por porta
lsof -ti:5173 | xargs kill -9

# Matar por nome
pkill -f vite

# Ver uso de memória
free -h

# Ver uso de disco
df -h

# Ver tamanho de pasta
du -sh pasta/
```

### Rede
```bash
# Ver portas abertas
netstat -tuln | grep LISTEN

# Testar conexão
ping google.com

# Ver IP do WSL
ip addr show eth0

# Curl para testar API
curl http://localhost:5173
```

### WSL Específicos
```bash
# Abrir pasta atual no Windows Explorer
explorer.exe .

# Abrir arquivo no VS Code
code .
code arquivo.txt

# Executar comando do Windows
powershell.exe Get-Date

# Acessar arquivos do Windows
cd /mnt/c/Users/SEU-USUARIO/

# Reiniciar WSL (no PowerShell Windows)
# wsl --shutdown
```

### Atalhos do Terminal
```
Ctrl+C          # Cancelar comando
Ctrl+D          # Sair (exit)
Ctrl+L          # Limpar tela (ou: clear)
Ctrl+R          # Buscar comando anterior
Tab             # Autocompletar
Seta cima/baixo # Navegar histórico
Ctrl+A          # Ir para início da linha
Ctrl+E          # Ir para fim da linha
Ctrl+U          # Apagar linha inteira
```

## Próximos Passos

### Personalização
```bash
# Editar cores
nano src/index.css
# Procurar por --rainbow-*

# Adicionar stopwords
nano src/utils/textProcessing.ts

# Customizar textos
nano src/pages/SessionPage.tsx
nano src/pages/HomePage.tsx
```

### Aprender Mais
- Leia `CUSTOMIZACAO.md` para guias de personalização
- Leia `GUIA_DE_USO.md` antes do evento
- Leia `FAQ.md` para dúvidas comuns
- Explore o código em `src/`

### Preparar para Evento
1. Teste todas as 4 sessões
2. Envie feedbacks de teste
3. Verifique nuvem de palavras
4. Prepare links diretos
5. Crie QR Codes (opcional)
6. Leia `CHECKLIST_EVENTO.md`

### Backup
```bash
# Backup do projeto
cd ~/projetos
tar -czf fichas-backup-$(date +%Y%m%d).tar.gz fichas-que-caem/

# Verificar backup
ls -lh fichas-backup-*.tar.gz

# Restaurar (se necessário)
tar -xzf fichas-backup-20260402.tar.gz
```

## Dicas de Produtividade (WSL)

### Aliases Úteis
```bash
# Adicionar ao ~/.bashrc
nano ~/.bashrc

# Adicionar no final:
alias dev='npm run dev'
alias build='npm run build'
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Recarregar
source ~/.bashrc

# Agora pode usar:
# dev        # ao invés de npm run dev
# gs         # ao invés de git status
```

### Abrir VS Code Direto
```bash
# Na pasta do projeto
code .

# Abrir arquivo específico
code src/App.tsx

# Comparar arquivos
code -d arquivo1.txt arquivo2.txt
```

### Integração com Windows
```bash
# Acessar área de trabalho do Windows
cd /mnt/c/Users/SEU-USUARIO/Desktop

# Copiar para WSL
cp /mnt/c/Users/SEU-USUARIO/Desktop/arquivo.txt ~/projetos/

# Copiar do WSL para Windows
cp ~/projetos/arquivo.txt /mnt/c/Users/SEU-USUARIO/Desktop/
```

## Performance no WSL

### Otimizar npm
```bash
# Cache agressivo
npm config set prefer-offline true

# Desabilitar progress bars
npm config set progress false

# Usar instalação paralela
npm config set maxsockets 5

# Verificar configurações
npm config list
```

### Manter Projeto no WSL (Mais Rápido)
```bash
# ❌ LENTO: Projeto em /mnt/c/ (sistema Windows)
cd /mnt/c/Users/SEU-USUARIO/projetos

# ✅ RÁPIDO: Projeto em ~ (sistema Linux WSL)
cd ~/projetos

# Migrar projeto
mv /mnt/c/Users/SEU-USUARIO/projetos/fichas-que-caem ~/projetos/
```

## Suporte e Recursos

### Documentação do Projeto
- `README.md` - Documentação técnica completa
- `FAQ.md` - Perguntas frequentes
- `CUSTOMIZACAO.md` - Guia de personalização
- `REFERENCIA_RAPIDA.md` - Comandos rápidos

### Recursos WSL
- [Documentação WSL](https://docs.microsoft.com/pt-br/windows/wsl/)
- [WSL Best Practices](https://docs.microsoft.com/pt-br/windows/wsl/setup/environment)
- [VS Code + WSL](https://code.visualstudio.com/docs/remote/wsl)

### Recursos Node.js/npm
- [Documentação npm](https://docs.npmjs.com/)
- [Node.js Guides](https://nodejs.org/en/docs/guides/)

### Recursos Git
- [Git Cheat Sheet](https://training.github.com/downloads/pt_BR/github-git-cheat-sheet/)
- [Connecting to GitHub with SSH](https://docs.github.com/pt/authentication/connecting-to-github-with-ssh)

### Comunidade
- Abra issues no GitHub para dúvidas
- Compartilhe sua experiência
- Contribua com melhorias

---

## Resumo Rápido (TL;DR)

```bash
# 1. Instalar pré-requisitos (uma vez só)
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

# 2. Navegar para pasta do projeto
cd ~/projetos/fichas-que-caem

# 3. Configurar ambiente
cp .env.example .env.local
nano .env.local  # Adicionar credenciais Supabase

# 4. Instalar e rodar
npm install
npm run dev

# 5. Testar
# Abrir http://localhost:5173 no navegador

# 6. Deploy (quando pronto)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/fichas-que-caem.git
git push -u origin main

# Configurar Secrets no GitHub
# Habilitar GitHub Pages
```

---

**Dica Final**: Desenvolver no WSL é como usar Linux nativo. Mantenha seus projetos em `~/projetos/` para melhor performance!

**Lembre-se**: Teste tudo localmente antes do deploy. É muito mais fácil debugar! 🎯

**Precisa de ajuda?** Consulte o FAQ.md ou abra uma issue no GitHub.
