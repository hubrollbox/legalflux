
# LegalFlux - Plataforma de Gestão Jurídica

## Instruções Importantes para Configuração do Projeto

### 1. Configuração do TypeScript

Devido às restrições do projeto, o arquivo `tsconfig.json` está marcado como somente leitura. Por favor, atualize manualmente o arquivo com o seguinte conteúdo:

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

### 2. Componentes faltantes

Vários componentes e arquivos foram adicionados para resolver erros de importação:

- Componentes UI básicos (Button, Input, Label, Alert, etc.)
- Funções de utilidade para validação
- Funções para mock data

### 3. Problemas Conhecidos

- O componente `AdvancedAnalytics.tsx` possui vários erros de tipo que precisam ser resolvidos. É recomendável refatorar esse arquivo.
- Alguns arquivos estão importando de "@/" que precisa ser configurado corretamente após a atualização do tsconfig.json.

### 4. Próximos Passos

1. Atualize o tsconfig.json conforme as instruções acima
2. Reinicie o servidor de desenvolvimento após as alterações
3. Verifique se ainda existem erros de importação e tipos
4. Considere refatorar componentes complexos como `AdvancedAnalytics.tsx`

## Dependências Principais

- React Router Dom para navegação
- Shadcn/UI para componentes de interface
- Lucide React para ícones
- date-fns para manipulação de datas

## Estrutura do Projeto

- `/src/components` - Componentes reutilizáveis
- `/src/hooks` - Hooks personalizados como useAuth
- `/src/lib` - Utilitários e funções compartilhadas
- `/src/pages` - Páginas principais da aplicação
- `/src/types` - Definições de tipos TypeScript
- `/src/utils` - Funções utilitárias adicionais
