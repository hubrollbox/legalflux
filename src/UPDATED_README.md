
# Instruções Importantes para Configuração do TypeScript

Devido às restrições do projeto, o arquivo `tsconfig.json` está marcado como somente leitura. Por favor, atualize manualmente o arquivo com o conteúdo do arquivo `src/tsconfig.json.temp`.

## Alterações Necessárias:

1. Adicionar `"allowSyntheticDefaultImports": true` às opções do compilador
2. Adicionar `"downlevelIteration": true` às opções do compilador
3. Adicionar mapeamento de caminhos para "@" apontar para "./src/*"

Estas alterações corrigirão os problemas de importação do React e os problemas de resolução de módulos.

## Instruções para Atualização Manual do tsconfig.json:

1. Abra o arquivo tsconfig.json do seu projeto
2. Adicione estas opções do compilador se elas não existirem:
   ```json
   "allowSyntheticDefaultImports": true,
   "downlevelIteration": true,
   ```
3. Adicione mapeamento de caminhos:
   ```json
   "baseUrl": ".",
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

Após fazer essas alterações, reinicie o servidor de desenvolvimento e os problemas de caminho alias devem ser resolvidos.

## Importante: Dependências

Este projeto utiliza várias dependências do shadcn/ui que devem ser instaladas. As mais importantes são:

- @radix-ui/react-label
- @radix-ui/react-select
- @radix-ui/react-tabs
- @radix-ui/react-popover
- @radix-ui/react-switch
- date-fns

## Resolução de Problemas Comuns

- Se você ainda vir erros sobre importações @/, verifique se o tsconfig.json foi corretamente atualizado
- Para erros sobre módulos não encontrados, verifique se todas as dependências necessárias foram instaladas
- Para problemas de tipagem, verifique se você está seguindo as definições de tipo fornecidas

## Navegação do Projeto

O projeto segue uma estrutura de diretórios organizada:
- `/src/components` - Componentes reutilizáveis
- `/src/hooks` - Hooks personalizados como useAuth
- `/src/lib` - Utilitários e funções compartilhadas
- `/src/pages` - Páginas principais da aplicação
- `/src/types` - Definições de tipos TypeScript
- `/src/utils` - Funções utilitárias adicionais

## Autenticação

O sistema usa um hook `useAuth` personalizado que fornece:
- Login/Logout
- Registro de usuários
- Redefinição de senha
- Verificação de estado de autenticação

Verifique `src/hooks/useAuth.tsx` para detalhes da implementação.
