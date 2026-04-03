-- ============================================
-- FICHAS QUE CAEM - Configuração do Supabase
-- ============================================
-- Execute este SQL no SQL Editor do Supabase
-- para criar a tabela e configurar as políticas

-- 1. Criar a tabela feedbacks
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id INTEGER NOT NULL CHECK (session_id >= 1 AND session_id <= 4),
  text TEXT NOT NULL CHECK (char_length(text) <= 500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_feedbacks_session_id ON feedbacks(session_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- 4. Criar política para permitir SELECT público (leitura)
CREATE POLICY "Permitir leitura pública de feedbacks"
ON feedbacks
FOR SELECT
TO public
USING (true);

-- 5. Criar política para permitir INSERT público (escrita)
CREATE POLICY "Permitir inserção pública de feedbacks"
ON feedbacks
FOR INSERT
TO public
WITH CHECK (true);

-- 6. Habilitar Realtime para a tabela
-- Execute este comando no SQL Editor:
ALTER PUBLICATION supabase_realtime ADD TABLE feedbacks;

-- ============================================
-- COMANDOS ÚTEIS PARA GERENCIAMENTO
-- ============================================

-- Ver todos os feedbacks de uma sessão específica:
-- SELECT * FROM feedbacks WHERE session_id = 1 ORDER BY created_at DESC;

-- Contar feedbacks por sessão:
-- SELECT session_id, COUNT(*) as total FROM feedbacks GROUP BY session_id;

-- Limpar feedbacks de teste (CUIDADO EM PRODUÇÃO):
-- DELETE FROM feedbacks WHERE created_at < NOW() - INTERVAL '1 hour';

-- Desabilitar realtime (se necessário):
-- ALTER PUBLICATION supabase_realtime DROP TABLE feedbacks;
