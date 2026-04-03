# Troubleshooting WSL - Fichas que Caem 🔧

Guia completo de solução de problemas específicos do WSL/Linux.

---

## Problemas de Instalação

### WSL não está instalado

**Erro:** `wsl: command not found` no PowerShell

**Solução:**
```powershell
# No PowerShell (como Administrador)
wsl --install

# Reinicie o computador
```

### WSL1 ao invés de WSL2

**Verificar versão:**
```powershell
# No PowerShell
wsl -l -v

# Se mostrar "VERSION 1", atualize:
wsl --set-version Ubuntu 2
```

### Node.js versão errada

**Verificar:**
```bash
node --version
# Se for menor que v18, atualize:

# Remover versão antiga
sudo apt remove nodejs npm

# Instalar versão LTS atual
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar novamente
node --version  # Deve ser v20.x.x
```

---

## Problemas de Performance

### npm install muito lento

**Problema:** Instalação demora mais de 10 minutos

**Causa:** Projeto está em `/mnt/c/` (sistema Windows)

**Solução:**
```bash
# Verificar localização
pwd

# Se estiver em /mnt/c/, mover para WSL:
# 1. Fazer backup
cd /mnt/c/Users/SEU-USUARIO/Desktop
tar -czf fichas-backup.tar.gz fichas-que-caem/

# 2. Criar pasta no WSL
mkdir -p ~/projetos

# 3. Mover projeto
mv fichas-que-caem ~/projetos/

# 4. Ir para nova localização
cd ~/projetos/fichas-que-caem

# 5. Reinstalar (será muito mais rápido)
rm -rf node_modules package-lock.json
npm install
```

### Vite muito lento para iniciar

**Solução:**
```bash
# 1. Limpar cache do Vite
rm -rf node_modules/.vite

# 2. Aumentar memória do WSL
# Criar arquivo: C:\Users\SEU-USUARIO\.wslconfig
# Adicionar:
# [wsl2]
# memory=4GB
# processors=2

# 3. Reiniciar WSL (no PowerShell)
# wsl --shutdown
# Abrir WSL novamente

# 4. Rodar novamente
npm run dev
```

---

## Problemas de Acesso a Arquivos

### "Permission denied" ao criar arquivos

**Erro:** `EACCES: permission denied`

**Solução:**
```bash
# NÃO use sudo com npm!

# 1. Verificar permissões
ls -la

# 2. Corrigir permissões (se necessário)
sudo chown -R $USER:$USER ~/projetos/fichas-que-caem

# 3. Tentar novamente
npm install
```

### Não consegue editar arquivos do Windows

**Problema:** Arquivos aparecem como somente leitura

**Solução 1: Usar WSL nativo**
```bash
# Copiar projeto para WSL
cp -r /mnt/c/Users/SEU-USUARIO/projetos/fichas-que-caem ~/projetos/
cd ~/projetos/fichas-que-caem
```

**Solução 2: Montar com permissões**
```bash
# Editar /etc/wsl.conf
sudo nano /etc/wsl.conf

# Adicionar:
# [automount]
# options = "metadata,umask=22,fmask=11"

# Reiniciar WSL (no PowerShell)
# wsl --shutdown
```

---

## Problemas de Rede

### localhost:5173 não abre no Windows

**Verificar conexão WSL-Windows:**
```bash
# No WSL, pegar IP
ip addr show eth0 | grep inet

# Testar se servidor está rodando
curl http://localhost:5173

# Se funcionar no WSL mas não no Windows:
# 1. Verificar firewall do Windows
# 2. Tentar IP direto: http://172.x.x.x:5173
```

**Solução alternativa - expor host:**
```bash
# Rodar Vite com --host
npm run dev -- --host

# Acessar via IP mostrado no terminal
```

### Erro "EADDRINUSE" (porta ocupada)

**Erro:** Port 5173 is already in use

**Solução:**
```bash
# Encontrar processo usando a porta
lsof -ti:5173

# Matar processo
lsof -ti:5173 | xargs kill -9

# Ou matar por nome
pkill -f vite

# Verificar se liberou
lsof -ti:5173
# (não deve retornar nada)

# Rodar novamente
npm run dev
```

### Não consegue conectar ao Supabase

**Erro:** Failed to fetch / Network error

**Diagnóstico:**
```bash
# 1. Testar conexão internet
ping -c 3 google.com

# 2. Testar DNS
nslookup supabase.com

# 3. Testar conexão Supabase
curl https://supabase.com

# 4. Verificar variáveis de ambiente
cat .env.local

# 5. Ver logs detalhados (F12 no navegador > Console)
```

**Solução:**
```bash
# Se DNS não funcionar, adicionar Google DNS
sudo nano /etc/resolv.conf

# Adicionar no início:
# nameserver 8.8.8.8
# nameserver 8.8.4.4

# Salvar e tentar novamente
```

---

## Problemas de Git

### Git pede senha toda vez (HTTPS)

**Solução 1: Cache de credenciais**
```bash
# Cache por 1 hora
git config --global credential.helper 'cache --timeout=3600'

# Cache permanente (menos seguro)
git config --global credential.helper store
```

**Solução 2: Usar SSH (recomendado)**
```bash
# 1. Gerar chave SSH
ssh-keygen -t ed25519 -C "seu.email@example.com"
# Pressione Enter 3 vezes

# 2. Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# 3. Adicionar no GitHub
# https://github.com/settings/keys

# 4. Testar conexão
ssh -T git@github.com

# 5. Mudar remote para SSH
git remote set-url origin git@github.com:SEU-USUARIO/fichas-que-caem.git

# 6. Fazer push (não pedirá senha mais)
git push
```

### "Permission denied (publickey)" com SSH

**Erro ao fazer git push com SSH**

**Solução:**
```bash
# 1. Verificar se chave existe
ls -la ~/.ssh/id_ed25519*

# Se não existir, gerar:
ssh-keygen -t ed25519 -C "seu.email@example.com"

# 2. Iniciar ssh-agent
eval "$(ssh-agent -s)"

# 3. Adicionar chave
ssh-add ~/.ssh/id_ed25519

# 4. Copiar e adicionar no GitHub
cat ~/.ssh/id_ed25519.pub

# 5. Testar
ssh -T git@github.com
# Deve retornar: "Hi usuario! You've successfully authenticated..."
```

### Git muito lento

**Problema:** git status/add/commit demoram muito

**Solução:**
```bash
# 1. Mover projeto para WSL (se estiver em /mnt/c/)
# Ver seção "Performance" acima

# 2. Otimizar configuração
git config --global core.preloadindex true
git config --global core.fscache true
git config --global gc.auto 256

# 3. Limpar histórico (se for novo projeto)
rm -rf .git
git init
git add .
git commit -m "Initial commit"
```

---

## Problemas de Compilação

### "Module not found" ou erros de import

**Erro:** Cannot find module '@/...'

**Solução:**
```bash
# 1. Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install

# 2. Limpar cache do TypeScript
rm -rf node_modules/.cache

# 3. Limpar cache do Vite
rm -rf node_modules/.vite

# 4. Reiniciar servidor
npm run dev
```

### TypeScript: "Cannot find type definitions"

**Erro:** Cannot find name 'React' / JSX element implicitly has type 'any'

**Solução:**
```bash
# 1. Verificar se @types estão instalados
npm list @types/react @types/react-dom

# 2. Se não estiverem, instalar
npm install --save-dev @types/react @types/react-dom

# 3. Verificar tsconfig.json
cat tsconfig.json | grep jsx
# Deve ter: "jsx": "react-jsx"
```

### Build falha com erro de memória

**Erro:** JavaScript heap out of memory

**Solução:**
```bash
# 1. Aumentar limite de memória do Node
export NODE_OPTIONS="--max-old-space-size=4096"

# 2. Tentar build novamente
npm run build

# 3. Para permanente, adicionar ao ~/.bashrc
echo 'export NODE_OPTIONS="--max-old-space-size=4096"' >> ~/.bashrc
source ~/.bashrc
```

---

## Problemas de Ambiente

### Variáveis de ambiente não carregam

**Problema:** import.meta.env.VITE_SUPABASE_URL é undefined

**Diagnóstico:**
```bash
# 1. Verificar se arquivo existe
ls -la .env.local

# 2. Ver conteúdo
cat .env.local

# 3. Verificar formato (sem espaços extras)
# Correto:   VITE_SUPABASE_URL=https://abc.supabase.co
# Incorreto: VITE_SUPABASE_URL = https://abc.supabase.co
```

**Solução:**
```bash
# 1. Recriar .env.local
rm .env.local
cp .env.example .env.local

# 2. Editar corretamente
nano .env.local

# 3. IMPORTANTE: Variáveis devem começar com VITE_
# ✅ VITE_SUPABASE_URL
# ❌ SUPABASE_URL

# 4. Reiniciar servidor (Ctrl+C e npm run dev)
```

### .env.local não é ignorado pelo Git

**Problema:** Git quer adicionar .env.local

**Solução:**
```bash
# 1. Verificar .gitignore
cat .gitignore | grep .env

# Se não tiver, adicionar:
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore

# 2. Remover do stage (se já foi adicionado)
git rm --cached .env.local

# 3. Commitar .gitignore
git add .gitignore
git commit -m "Adicionar .env.local ao gitignore"
```

---

## Problemas do VS Code

### VS Code não abre do WSL

**Erro:** code: command not found

**Solução:**
```bash
# 1. Instalar VS Code no Windows
# Download: https://code.visualstudio.com

# 2. Durante instalação, marque:
# - "Add to PATH"
# - "Register Code as an editor for supported file types"

# 3. Instalar extensão WSL no VS Code
# Abrir VS Code > Extensions > Buscar "WSL" > Instalar

# 4. No WSL, recarregar PATH
source ~/.bashrc

# 5. Testar
code .
```

### Extensões não funcionam no WSL

**Problema:** ESLint, Prettier, etc não funcionam

**Solução:**
```bash
# 1. Abrir VS Code do WSL
code .

# 2. VS Code mostrará: "Install recommended extensions for WSL"
# Clicar em "Install"

# 3. Ou instalar manualmente:
# - ESLint
# - Prettier
# - TypeScript and JavaScript Language Features
# - Vite

# 4. Recarregar window (Ctrl+Shift+P > "Reload Window")
```

---

## Problemas de Memória/Recursos

### WSL usa muita RAM

**Verificar uso:**
```bash
# No WSL
free -h

# No PowerShell
# wsl --shutdown
# Verificar memória no Gerenciador de Tarefas
```

**Limitar memória do WSL:**
```
1. Criar arquivo: C:\Users\SEU-USUARIO\.wslconfig
2. Adicionar:

[wsl2]
memory=2GB
processors=2
swap=1GB

3. Reiniciar WSL:
   PowerShell: wsl --shutdown
   Abrir WSL novamente
```

### Disco cheio

**Verificar espaço:**
```bash
# Ver uso de disco
df -h

# Ver tamanho das pastas
du -sh ~/projetos/*

# Ver maiores arquivos
du -h ~/projetos | sort -h | tail -20
```

**Limpar espaço:**
```bash
# Limpar cache do npm
npm cache clean --force

# Limpar node_modules antigos
find ~/projetos -name "node_modules" -type d -prune -exec du -sh {} \;
# Deletar os que não usar mais

# Limpar packages do apt
sudo apt autoremove
sudo apt clean

# Compactar logs antigos
sudo journalctl --vacuum-time=7d
```

---

## Comandos de Diagnóstico

### Sistema
```bash
# Versão do WSL
wsl --version  # No PowerShell

# Versão do Ubuntu
lsb_release -a

# Uptime
uptime

# Processos
top
htop  # Instalar: sudo apt install htop
```

### Node/npm
```bash
# Versões
node --version
npm --version

# Configurações npm
npm config list
npm config get registry

# Cache
npm cache verify
```

### Rede
```bash
# IP do WSL
ip addr show eth0

# Portas abertas
netstat -tuln

# DNS
cat /etc/resolv.conf

# Ping
ping -c 3 google.com
ping -c 3 supabase.com
```

### Git
```bash
# Configuração
git config --list

# Remote
git remote -v

# Status
git status
git log --oneline -5
```

---

## Reset Total (Último Recurso)

### Resetar projeto
```bash
# 1. Backup do .env.local
cp .env.local .env.backup

# 2. Limpar completamente
rm -rf node_modules
rm -rf package-lock.json
rm -rf dist
rm -rf .vite
rm -rf .cache

# 3. Reinstalar
npm install

# 4. Restaurar .env
cp .env.backup .env.local

# 5. Testar
npm run dev
```

### Reinstalar WSL (extremo)
```powershell
# No PowerShell (como Administrador)

# 1. Exportar distribuição (backup)
wsl --export Ubuntu ubuntu-backup.tar

# 2. Desinstalar
wsl --unregister Ubuntu

# 3. Reinstalar
wsl --install -d Ubuntu

# 4. Ou importar backup
wsl --import Ubuntu C:\WSL\Ubuntu ubuntu-backup.tar
```

---

## Recursos de Ajuda

### Logs
```bash
# Logs do npm
cat ~/.npm/_logs/*.log | tail -50

# Logs do sistema
sudo journalctl -xe

# Logs do Vite (no terminal onde rodou npm run dev)
```

### Comunidade
- [WSL GitHub Issues](https://github.com/microsoft/WSL/issues)
- [Stack Overflow - WSL tag](https://stackoverflow.com/questions/tagged/wsl)
- [Reddit r/bashonubuntuonwindows](https://reddit.com/r/bashonubuntuonwindows)

### Documentação
- [WSL Docs](https://docs.microsoft.com/pt-br/windows/wsl/)
- [WSL Troubleshooting](https://docs.microsoft.com/pt-br/windows/wsl/troubleshooting)

---

**Não resolveu?** Abra uma issue no GitHub com:
- Descrição do problema
- Comando que rodou
- Erro completo
- Output de: `node --version`, `npm --version`, `wsl --version`

**Boa sorte!** 🚀
