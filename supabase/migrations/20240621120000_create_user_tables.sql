CREATE TABLE particulares (
  id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  telefone TEXT,
  morada TEXT
);

CREATE TABLE profissionais (
  id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  numero_cedula TEXT NOT NULL,
  email_profissional TEXT NOT NULL,
  morada_profissional TEXT NOT NULL,
  ordem_id TEXT NOT NULL,
  empresa_id UUID REFERENCES empresas(id)
);

CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nome TEXT NOT NULL,
  nif TEXT NOT NULL UNIQUE,
  cae TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  morada TEXT NOT NULL
);

ALTER TABLE particulares ENABLE ROW LEVEL SECURITY;
ALTER TABLE profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso próprio particulares" ON particulares
FOR ALL USING (auth.uid() = id);

CREATE POLICY "Acesso próprio profissionais" ON profissionais
FOR ALL USING (auth.uid() = id);

CREATE POLICY "Acesso empresas vinculadas" ON empresas
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profissionais
    WHERE profissionais.empresa_id = empresas.id
    AND profissionais.id = auth.uid()
  )
);