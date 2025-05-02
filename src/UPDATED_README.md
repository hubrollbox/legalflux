
# Instruções de Configuração do LegalFlux

Para corrigir os problemas de build, siga estas instruções:

## 1. Configuração do TypeScript

Como o arquivo `tsconfig.json` é somente leitura, você precisa copiar o conteúdo de `src/tsconfig.json.temp` para o seu arquivo `tsconfig.json` para garantir que todas as configurações necessárias estejam presentes:

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

Configurações críticas que foram adicionadas:

- `"allowSyntheticDefaultImports": true` - Necessário para importar React corretamente
- `"downlevelIteration": true` - Necessário para iterar através de Sets
- `"baseUrl": "."` e as configurações de path - Para suportar importações com `@/`

## 2. Dependências instaladas

As seguintes dependências foram instaladas para o projeto:

- date-fns
- recharts
- react-day-picker
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-select
- @radix-ui/react-switch
- @radix-ui/react-tabs

## 3. Componentes UI criados

Foram criados os seguintes componentes UI para suportar a aplicação:

- Card e variantes
- Tabs
- Select
- Calendar
- Popover
- Switch

## 4. Tipos adicionados

Foi criado o arquivo `src/types/index.ts` com tipos para:

- Usuários e Papéis
- Processos e Estados
- Tarefas
- Documentos
- Transações Financeiras
- Clientes
- Assinaturas

## 5. Utilidades adicionadas

- Adicionada a função `getPlanDetails` em `src/lib/utils.ts` para obter detalhes dos planos
- Criado `src/utils/dashboardUtils.ts` com `getUserRoleName` e outras funções de utilidade

## 6. Mock Data

Criado o arquivo `src/services/mockData.ts` com dados fictícios para desenvolvimento

## Problemas resolvidos:

1. Resolvidos erros de TypeScript relacionados a importações com alias `@/`
2. Corrigida a falta da função `getPlanDetails` no arquivo utils
3. Corrigidos problemas na renderização de gráficos no AdvancedAnalytics
4. Adicionados tipos para garantir consistência no código

Se encontrar outros problemas, certifique-se de que todas as importações estão corretas e que os caminhos estão corretamente configurados.
