
# Instruções de Configuração do LegalFlux

Para corrigir os problemas de build, siga estas instruções detalhadas:

## 1. Configuração do TypeScript (CRÍTICO)

Como o arquivo `tsconfig.json` é somente leitura, você precisa copiar manualmente o conteúdo de `src/tsconfig.json.temp` para o seu arquivo `tsconfig.json`, ou adicionar estas configurações essenciais ao tsconfig.json existente:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "downlevelIteration": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Não prossiga sem esta configuração, pois ela é essencial para resolver os erros de importação e alias de caminho (@/).

## 2. Dependências Instaladas

As seguintes dependências foram adicionadas ao projeto:

- date-fns: Utilizada para formatação e manipulação de datas
- lucide-react: Biblioteca de ícones usada no AdvancedAnalytics
- react-hook-form: Para manipulação de formulários 
- zod: Para validação de esquemas
- @hookform/resolvers: Integração entre react-hook-form e zod
- sonner: Sistema de toast/notificações
- Componentes Radix UI: para input, select, checkbox, etc.

## 3. Componentes UI Criados

Foram criados os seguintes componentes UI conforme o padrão shadcn:

- Button
- Input
- Textarea
- Label
- Select
- Form
- Checkbox
- Card
- Tabs
- Calendar
- Popover
- Switch

## 4. Utilitários e Hooks

- `src/lib/utils.ts`: Contém a função `getPlanDetails` e utilitários comuns
- `src/hooks/useAuth.tsx`: Hook para autenticação 
- `src/hooks/usePermissions.tsx`: Hook para controle de permissões

## 5. Arquivos de Tipos

- `src/types/auth.ts`: Tipos para autenticação
- `src/types/permissions.ts`: Tipos para controle de permissões
- `src/types/index.ts`: Tipos gerais da aplicação

## Fluxo de Resolução de Problemas

Se ainda enfrentar erros após estas alterações, siga este fluxo de resolução:

1. **Erros de importação (@/)**: Certifique-se que o tsconfig.json tenha a configuração de paths para os aliases
2. **Erros de iteração em Sets**: Verifique que downlevelIteration está habilitado no tsconfig.json
3. **Erros de importação React**: Confirme que allowSyntheticDefaultImports está ativado
4. **Erros de componentes faltando**: Verifique se todos os arquivos de componentes foram criados

## Componentes a Implementar em Próximas Fases

- Accordion
- Alert
- Avatar
- Badge
- Dialog
- Dropdown Menu
- Tooltip
