-- Habilita RLS nas tabelas principais
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela 'clients'
CREATE POLICY "Admin full access" ON clients
  FOR ALL USING (current_setting('app.current_user_role') = 'admin');

CREATE POLICY "Lawyers org access" ON clients
  FOR ALL USING (
    current_setting('app.current_user_role') = 'lawyer' 
    AND organization_id = (current_setting('app.current_organization_id'))::uuid
  );

CREATE POLICY "Client self access" ON clients
  FOR SELECT USING (id = auth.uid());

-- Políticas para tabela 'processes'
CREATE POLICY "Admin full access" ON processes
  FOR ALL USING (current_setting('app.current_user_role') = 'admin');

CREATE POLICY "Lawyers org access" ON processes
  FOR ALL USING (
    current_setting('app.current_user_role') IN ('admin', 'lawyer')
    AND organization_id = (current_setting('app.current_organization_id'))::uuid
  );

-- Políticas para tabela 'documents'
CREATE POLICY "Admin full access" ON documents
  FOR ALL USING (current_setting('app.current_user_role') = 'admin');

CREATE POLICY "Role-based access" ON documents
  FOR ALL USING (
    (current_setting('app.current_user_role') = 'admin') OR
    (current_setting('app.current_user_role') = 'lawyer' AND organization_id = (current_setting('app.current_organization_id'))::uuid) OR
    (created_by = auth.uid())
  );