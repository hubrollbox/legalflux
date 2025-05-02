
# Instruções Importantes para Configurar o TypeScript

**ATENÇÃO: A configuração do TypeScript é essencial para o funcionamento correto do projeto.**

Como o arquivo `tsconfig.json` é somente leitura e não pode ser modificado diretamente, siga estas instruções detalhadas:

## 1. Configuração do TypeScript (CRÍTICO)

Você precisa copiar manualmente o conteúdo de `src/tsconfig.json.temp` para o seu arquivo `tsconfig.json`, ou adicionar estas configurações essenciais ao tsconfig.json existente:

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

## Configurações Críticas

As seguintes configurações DEVEM ser adicionadas:

1. **allowSyntheticDefaultImports: true** - Para permitir importação de módulos como React
2. **downlevelIteration: true** - Para suportar iteração em conjuntos (Sets)
3. **paths: { "@/*": ["./src/*"] }** - Para resolver importações que começam com @/
4. **baseUrl: "."** - Necessário para que o mapeamento de paths funcione corretamente

## Como atualizar o tsconfig.json

1. Abra o arquivo tsconfig.json
2. Adicione as configurações acima às "compilerOptions"
3. Salve o arquivo
4. **IMPORTANTE:** Reinicie o servidor de desenvolvimento após fazer estas alterações

Sem estas configurações, você continuará a ver erros como:
- "Cannot find module '@/components/...'"
- "Module can only be default-imported using the 'allowSyntheticDefaultImports' flag"
- "Type 'Set<string>' can only be iterated through when using the '--downlevelIteration' flag"
